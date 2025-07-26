// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { console } from "hardhat/console.sol";
import { PriceFeed } from  "./PriceFeed.sol";
import { AggregatorV3Interface } from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

error InsuffiecientFunds();
error UnauthorizedAccess();
error WithdrawlFailed();

/// @title FundMe
/// @author Michal Brabec
/// @notice Test contract
contract FundMe {
    using PriceFeed for uint256;

    /// @notice Contract owner
    address public immutable OWNER;

    /// @notice Minimal funding in USD accepted by the contract
    uint256 public immutable MIN_FUNDING_USD;

    /// @notice ETH USD price feed
    address public immutable PRICE_FEED;

    /// @notice List of accounts that funded the contract
    address[] public s_funders;

    /// @notice Total funding provided by all funders
    mapping (address => uint256) public s_funding;

    /// @notice Record contract creator as owner
    /// @param _minUsdFunding Minimal funding accepted by the contract
    /// @param _priceFeedAddress Address of the ETH USD price feed oracle node
    constructor (uint256 _minUsdFunding, address _priceFeedAddress) {
        OWNER = msg.sender;
        MIN_FUNDING_USD = _minUsdFunding*100;
        PRICE_FEED = _priceFeedAddress;
    }

    /// @notice Fund contract and record the sender
    function fund() public payable {
        uint256 valueUsd = msg.value.ethToUsdCents(PRICE_FEED);
        console.log("Contract log - ", msg.value);
        console.log("Contract log - ", valueUsd);
        if (valueUsd < MIN_FUNDING_USD) {
            revert InsuffiecientFunds();
        }

        address funder = msg.sender;
        if (s_funding[funder] == 0) {
            s_funders.push(funder);
        }
        s_funding[funder] += msg.value;
    }

    /// @notice Withdraw all funds from the contract and clear funders
    function withdraw() public onlyOwner {
        for (uint256 i = 0; i < s_funders.length; ++i) {
            s_funding[s_funders[i]] = 0;
        }
        s_funders = new address[](0);
        (bool result, ) = payable(msg.sender).call{value: address(this).balance}("");
        if (!result) {
            revert WithdrawlFailed();
        }
    }

    /// @notice Redirect to `fund`
    fallback() external payable {
        fund();
    }

    /// @notice Redirect to `fund`
    receive() external payable {
        fund();
    }

    modifier onlyOwner {
        if (msg.sender != OWNER) {
            revert UnauthorizedAccess();
        }
        _;
    }
}