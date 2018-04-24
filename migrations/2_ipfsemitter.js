const IpfsEmitter = artifacts.require("./IpfsEmitter.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(IpfsEmitter, { from: accounts[0] });
};
