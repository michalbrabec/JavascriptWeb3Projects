// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    uint256 public immutable maxUserCount;

    struct User {
        string name;
        uint256 number;
    }

    User[] public users;
    mapping(string => uint) public index;

    constructor(uint256 _maxUserCount) {
        maxUserCount = _maxUserCount;
    }

    function addUser(string calldata _name, uint256 _number) public {
        users.push(User(_name, _number));
        index[_name] = _number;
    }

    function getNumber(uint256 _index) public view returns (uint256) {
        return users[_index].number;
    }

    function getNumber(string calldata _name) public view returns (uint256) {
        return index[_name];
    }
}
