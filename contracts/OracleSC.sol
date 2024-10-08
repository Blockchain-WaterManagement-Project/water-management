//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./QualitySC.sol";

contract OracleSC {
        address public qualitySCAddress;

    function setQualitySCAddress(address _qualitySCAddress) public {
        qualitySCAddress = _qualitySCAddress;
    }
    // Address of oracle contract
    address public oracleAddress;

    // Mapping of verification results
    mapping(uint256 => bool) public verificationResults;

    // Event emitted when verification is complete
    event VerificationComplete(uint256 requestId, bool verified);

    // Function to set contract address on deployment
    function setOracleAddress(address _oracleAddress) public {
        oracleAddress = _oracleAddress;
    }

    // Function to get the contract address
    function getOracleAddress() external view returns (address) {
        return oracleAddress;
    }

    // Function to forward fees for re-encryption and verification
    function forwardFees(uint256 _requestId, uint256 _fees) public {
        // Check if the caller is the QualitySC smart contract
        require(msg.sender == qualitySCAddress, "Caller is not the QualitySC smart contract");

        // Re-encrypt and verify water quality data ( simulate this process )
        bool verified = true; // Replace with actual verification logic

        // Store verification result
        verificationResults[_requestId] = verified;

        // Emit event
        emit VerificationComplete(_requestId, verified);
    }
}