// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract OracleSC {
    struct Request {
        uint id;                          // request id
        string urlToQuery;                // API url
        string attributeToFetch;          // json attribute (key) to retrieve in the response
        string agreedValue;               // value from key
        mapping(uint => string) answers;   // answers provided by the oracles
        mapping(address => uint) quorum;   // oracles which will query the answer (1=oracle hasn't voted, 2=oracle has voted)
    }

    Request[] public requests; // list of requests made to the contract
    uint public currentId = 0; // increasing request id
    uint public minQuorum = 2; // minimum number of responses to receive before declaring final result
    mapping(address => bool) public oracles; // Mapping to track registered oracles

    // event that triggers oracle outside of the blockchain
    event NewRequest (
        uint id, 
        string urlToQuery,
        string attributeToFetch
    );

    // triggered when there's a consensus on the final result
    event UpdatedRequest (
        uint id,
        string urlToQuery,
        string attributeToFetch,
        string agreedValue
    );

    // Event for oracle registration
    event OracleRegistered(address indexed oracleAddress);

    // Function to register an oracle
    function registerOracle() external {
        require(!oracles[msg.sender], "Oracle already registered");
        oracles[msg.sender] = true;
        emit OracleRegistered(msg.sender);
    }

    // Function to create a new request
    function createRequest(
        string memory _urlToQuery,
        string memory _attributeToFetch
    ) public {
        Request storage newRequest = requests.push(); // This will push an empty Request to the array

        newRequest.id = currentId;
        newRequest.urlToQuery = _urlToQuery;
        newRequest.attributeToFetch = _attributeToFetch;
        newRequest.agreedValue = "";

        emit NewRequest(
            currentId,
            _urlToQuery,
            _attributeToFetch
        );

        currentId++;
    }

    // Function to update a request with a new answer
    function updateRequest (
        uint _id,
        string memory _valueRetrieved
    ) public {
        require(oracles[msg.sender], "Only registered oracles can update requests");

        Request storage currRequest = requests[_id];

        if (currRequest.quorum[msg.sender] == 1) {
            currRequest.quorum[msg.sender] = 2;

            uint tmpI = 0;
            bool found = false;
            while (!found) {
                if (bytes(currRequest.answers[tmpI]).length == 0) {
                    found = true;
                    currRequest.answers[tmpI] = _valueRetrieved;
                }
                tmpI++;
            }

            uint currentQuorum = 0;

            for (uint i = 0; i < 10; i++) { // Arbitrary limit for the number of oracles
                bytes memory a = bytes(currRequest.answers[i]);
                bytes memory b = bytes(_valueRetrieved);

                if (keccak256(a) == keccak256(b)) {
                    currentQuorum++;
                    if (currentQuorum >= minQuorum) {
                        currRequest.agreedValue = _valueRetrieved;
                        emit UpdatedRequest (
                            currRequest.id,
                            currRequest.urlToQuery,
                            currRequest.attributeToFetch,
                            currRequest.agreedValue );
                    }
                }
            }
        }
    }

    // Function to retrieve the agreed value for a specific request
    function getAgreedValue(
        uint _id
    ) external view returns (string memory) {
        return requests[_id].agreedValue;
    }

    // Function to verify the data retrieved by oracles
    function verifyData(
        uint _id, 
        string memory _expectedValue
    ) public view returns (bool) {
        Request storage currRequest = requests[_id];
        // Check if the agreed value matches the expected value
        return (keccak256(bytes(currRequest.agreedValue)) == keccak256(bytes(_expectedValue)));
    }
}