// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract OracleSC {
    struct Request {
        uint id;
        string urlToQuery;
        string attributeToFetch;
        string response;
        mapping(address => uint) quorum; // Mapping for oracle votes
        string[] answers; // Array to store answers from oracles
        string agreedValue; // The agreed value after reaching quorum
    }

    Request[] public requests;
    uint public currentId;
    uint public totalOracleCount; // Total number of oracles
    uint public minQuorum; // Minimum number of votes required for agreement

    event NewRequest(uint indexed id, string urlToQuery, string attributeToFetch);
    event UpdateRequest(uint indexed id, string urlToQuery, string attributeToFetch, string agreedValue);

    function createRequest(
        string memory _urlToQuery,
        string memory _attributeToFetch
    ) public {
        // Create a new Request instance
        Request storage newRequest = requests.push(); // Push an empty Request to the array

        // Set properties
        newRequest.id = currentId;
        newRequest.urlToQuery = _urlToQuery;
        newRequest.attributeToFetch = _attributeToFetch;
        newRequest.agreedValue = ""; // Initialize agreedValue
        newRequest.answers = new string[](totalOracleCount); // Initialize answers array

        // Initialize the quorum mapping for trusted oracles
        newRequest.quorum[address(0xdF3e30bDa5C003aE01Cf56c81Db062A7C3e97FBF)] = 1;
        newRequest.quorum[address(0x6027FBa263F4d3E95B160EF934a04358A31Eb707)] = 1;
        newRequest.quorum[address(0x3DC9B467624fd0ccD09d60d5708Db1a9aD392EcA)] = 1;

        // Emit event for new request
        emit NewRequest(currentId, _urlToQuery, _attributeToFetch);

        // Increment request id
        currentId++;
    }

    function updateRequest(
        uint _id,
        string memory _valueRetrieved
    ) public {
        Request storage currentRequest = requests[_id];

        // Check if oracle has voted
        if (currentRequest.quorum[address(msg.sender)] == 1) {
            currentRequest.quorum[msg.sender] = 2; // Mark as voted

            // Find first empty slot in answers
            for (uint temp = 0; temp < totalOracleCount; temp++) {
                if (bytes(currentRequest.answers[temp]).length == 0) {
                    currentRequest.answers[temp] = _valueRetrieved; // Store the retrieved value
                    break; // Exit after storing the value
                }
            }

            uint currentQuorum = 0;

            // Check for matching answers
            for (uint i = 0; i < totalOracleCount; i++) {
                if (keccak256(bytes(currentRequest.answers[i])) == keccak256(bytes(_valueRetrieved))) {
                    currentQuorum++;
                    if (currentQuorum >= minQuorum) {
                        currentRequest.agreedValue = _valueRetrieved; // Set the agreed value
                        emit UpdateRequest(
                            currentRequest.id,
                            currentRequest.urlToQuery,
                            currentRequest.attributeToFetch,
                            currentRequest.agreedValue
                        );
                        break; // Exit once quorum is reached
                    }
                }
            }
        }
    }
}