pragma solidity ^0.4.19;

contract IpfsEmitter {

    address public owner;
    
    event FileAdded(bytes32 indexed fileHash);
    event Failed(address indexed sender);

    function IpfsEmitter() public {
        owner = msg.sender;
    }

    function add(bytes32 hash) public {
        if (msg.sender == owner) {
            FileAdded(hash);
        } else {
            Failed(msg.sender);
        }
    }

    function () public payable {
        revert();
    }

}