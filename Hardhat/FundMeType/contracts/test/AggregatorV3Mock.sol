// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AggregatorV3Mock {
    int256 immutable ANSWER;

    constructor(int256 _answer) {
        ANSWER = _answer;
    }

    function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) {
        return (0, ANSWER, 0, 0, 0);
    }
}