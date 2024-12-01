const WaterNFT = artifacts.require("WaterNFT");
const OracleSC = artifacts.require("OracleSC");
const QualitySC = artifacts.require("QualitySC");

module.exports = async function (_deployer) {
  // Deploy WaterNFT contract
  await _deployer.deploy(WaterNFT);
  const waterNFTInstance = await WaterNFT.deployed();

  // Deploy OracleSC contract
  await _deployer.deploy(OracleSC);
  const oracleInstance = await OracleSC.deployed();

  // Deploy QualitySC contract with the addresses of WaterNFT and OracleSC
  await _deployer.deploy(QualitySC, waterNFTInstance.address, oracleInstance.address);
};