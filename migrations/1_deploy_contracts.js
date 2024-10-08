var NFTCollection = artifacts.require("./NFTCollection.sol");
var QualitySC = artifacts.require("./QualitySC.sol");
var OracleSC = artifacts.require("./OracleSC.sol");

module.exports = function(deployer) {
  deployer.deploy(NFTCollection,"URI HERE","TOKEN NAME","SYMBOL");
  deployer.deploy(QualitySC);
  deployer.deploy(OracleSC).then(function(instance) {
    // Get the deployed OracleSC contract instance
    const oracleSCInstance = instance;

    // Set the oracle address as a variable in the contract
    const oracleAddress = instance.address;
    oracleSCInstance.setOracleAddress(oracleAddress);
  });
};
