// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { AggregatorV3Interface } from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/// @title ETH price feed provider
/// @author Michal Brabec
/// @notice Convert value in wei to USD using Chainlink
library PriceFeed {
    function ethPrice(address _priceFeed) public view returns (uint256) {
        (, int256 chainLinkPrice,,,) = AggregatorV3Interface(_priceFeed).latestRoundData();
        return uint256(chainLinkPrice * 1e10);
    }
    /// @notice Converts the given amount of wei into USD
    /// @param _wei Wei to convert to USD
    /// @param _priceFeed Price feed used to determine ETH price
    /// @return USD price of the wei parameter
    function ethToUsd(uint256 _wei, address _priceFeed) public view returns (uint256) {
        return (_wei * ethPrice(_priceFeed)) / 1e36;
    }
    /// @notice Converts the given amount of wei into USD cents
    /// @param _wei Wei to convert to USD cents
    /// @param _priceFeed Price feed used to determine ETH price
    /// @return USD price of the wei parameter in cents
    function ethToUsdCents(uint256 _wei, address _priceFeed) public view returns (uint256) {
        return (_wei * ethPrice(_priceFeed)) / 1e34;
    }
    function usdToEth(uint256 _usd, address _priceFeed) public view returns (uint256) {
        return (_usd * 1e36) / ethPrice(_priceFeed);
    }
    function usdCentsToEth(uint256 _cents, address _priceFeed) public view returns (uint256) {
        return (_cents * 1e34) / ethPrice(_priceFeed);
    }
}