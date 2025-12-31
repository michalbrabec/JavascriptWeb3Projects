const { ethers } = require("hardhat")

async function main() {
    // Get the first signer (account) from Hardhat
    const [sender] = await ethers.getSigners();
    // Create and send transaction
    const tx = await sender.sendTransaction({
        to: sender,
        value: 1000000000000000n,
        gasLimit: 40000000000000,
    });
    console.log(tx)
}

main().then(() => console.log("done"))