const multihashes = require('multihashes');
const IpfsEmitter = artifacts.require("IpfsEmitter");

const FILE_HASH = 'QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx';
const HEX_HASH = multihashes.toHexString(multihashes.fromB58String(FILE_HASH));
const FORMATTED_HASH = '0x' + HEX_HASH.slice(4);

contract('IpfsEmitter', function(accounts) {
  const creator = accounts[0];
  const rando = accounts[1];
  console.log('Creator: ', creator);
  it("should emit an event with a bytes32 IPFS hash sent by the creator", function() {
    return IpfsEmitter.deployed().then(function(instance) {
      return instance.add(FORMATTED_HASH, { from: creator });
    }).then(function(tx) {
      assert.equal(tx.logs[0].event, 'FileAdded', 'FileAdded is not the only event');
      assert.equal(tx.logs[0].args.fileHash, FORMATTED_HASH, 'FileAdded hash is not the one submitted');
      assert.equal(FILE_HASH, multihashes.toB58String(multihashes.fromHexString('1220' + tx.logs[0].args.fileHash.slice(2))));
    });
  });
  it("should not emit an event with a bytes32 IPFS hash sent by a rando", function() {
    return IpfsEmitter.deployed().then(function(instance) {
      return instance.add(FORMATTED_HASH, { from: rando });
    }).then(function(tx) {
      assert.equal(tx.logs[0].event, 'Failed', 'Failed is not the only event');
      assert.equal(tx.logs[0].args.sender, rando, 'Failed hash is not the one submitted');
    });
  });
});
