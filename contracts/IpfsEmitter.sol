pragma solidity ^0.4.23;

contract IpfsEmitter {

    address public creator;
    
    event FileAdded(bytes32 indexed fileHash);

    function IpfsStore() {
        creator = msg.sender;
    }

    function add(bytes32 hash) public {
        emit FileAdded(hash);
    }

}