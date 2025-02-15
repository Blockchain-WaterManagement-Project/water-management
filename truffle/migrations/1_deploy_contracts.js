const WaterNFT = artifacts.require("WaterNFT");
const OracleSC = artifacts.require("OracleSC");
const QualitySC = artifacts.require("QualitySC");

module.exports = async function (_deployer) {
  // Deploy WaterNFT contract
  await _deployer.deploy(WaterNFT);
  const instanceW = await WaterNFT.deployed();

  // Deploy QualitySC contract with the addresses of WaterNFT and OracleSC
  await _deployer.deploy(QualitySC);
  const instanceQ = await QualitySC.deployed();

  // Deploy OracleSC contract
  await _deployer.deploy(OracleSC, instanceQ.address, instanceW.address);
  const instanceO = await OracleSC.deployed();
};