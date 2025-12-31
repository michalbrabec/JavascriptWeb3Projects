const { ethers } = require("hardhat");

// Get the first signer (account) from Hardhat
const [sender] = await ethers.getSigners();
// Create and send transaction
const tx = await sender.sendTransaction({
    to: sender,
    value: 1,
});