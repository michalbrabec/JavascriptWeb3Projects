const { ethers } = require("hardhat")

async function main() {
    // Get the first signer (account) from Hardhat
    const [sender] = await ethers.getSigners();
    
    const transaction = {
        nonce: await provider.getTransactionCount(wallet.address),
        gasPrice: 20000000000,
        gasLimit: 1000000,
        to: null,
        value: 0,
        data: '0x' + bin + '000000000000000000000000000000000000000000000000000000000000000a', // contract constructor parameter encoded into hex string of uint256
        chainId: 1337
    }
    console.log(transaction)
    const signed = await sender.signTransaction(transaction)
    console.log(signed)
    response = await sender.sendTransaction(transaction)
    console.log(response)
    receipt = await response.wait(1)
    console.log(receipt)
}

main().then(() => console.log("done"))