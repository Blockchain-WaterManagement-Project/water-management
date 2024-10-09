//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./QualitySC.sol";

contract OracleSC {
    address public qualitySCAddress;

    // Address of oracle contract
    address public oracleAddress;

    // Mapping of Water Quality Verifiers to their reputation scores
    mapping (address => uint256) public verifierReputation;

    // Mapping of water quality data to its corresponding hash
    mapping (string => bytes32) public waterQualityData;

    // Mapping of verification results
    mapping(uint256 => bool) public verificationResults;

    // Event emitted when verification is complete
    event VerificationComplete(uint256 requestId, bool verified);

    // Event emitted when a new water quality data is reported
    event NewWaterQualityData(string data, bytes32 hash);

    // Event emitted when a verifier's reputation score is updated
    event ReputationUpdated(address verifier, uint256 newReputation);

    // Function to set QualitySC address on deployment
    function setQualitySCAddress(address _qualitySCAddress) public {
        qualitySCAddress = _qualitySCAddress;
    }
    // Function to set contract address on deployment
    function setOracleAddress(address _oracleAddress) public {
        oracleAddress = _oracleAddress;
    }

    // Function to get the contract address
    function getOracleAddress() external view returns (address) {
        return oracleAddress;
    }

    // Function to forward fees for re-encryption and verification
    function forwardFees(uint256 _requestId, uint256 _fees) public payable {
        // Check if the caller is the QualitySC smart contract
        require(msg.sender == qualitySCAddress, "Caller is not the QualitySC smart contract");

        // Check if the caller is the QualitySC smart contract
        require(msg.value >= _fees, "Caller does not have enough funds");

        // Re-encrypt and verify water quality data ( simulate this process )
        bool verified = true; // Replace with actual verification logic

        // Store verification result
        verificationResults[_requestId] = verified;

        // Emit event
        emit VerificationComplete(_requestId, verified);
    }
    // Function to report new water quality data
    function reportWaterQualityData(string memory _data) public {
        bytes32 _hash = keccak256(abi.encodePacked(_data));
        waterQualityData[_data] = _hash;
        emit NewWaterQualityData(_data, _hash);
    }

    // Function to update a verifier's reputation score
    function updateVerifierReputation(address _verifier, uint256 _newReputation) public {
        verifierReputation[_verifier] = _newReputation;
        emit ReputationUpdated(_verifier, _newReputation);
    }

    // Function to get a verifier's reputation score
    function getVerifierReputation(address _verifier) public view returns (uint256) {
        return verifierReputation[_verifier];
    }

    // Function to get the hash of a water quality data
    function getWaterQualityDataHash(string memory _data) public view returns (bytes32) {
        return waterQualityData[_data];
    }
}