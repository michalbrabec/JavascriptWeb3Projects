const { ethers, run, network } = require("hardhat")

async function wait(ms) {
    return new Promise(res => setTimeout(res, ms))
}

async function main() {
    const [owner, otherAccount] = await ethers.getSigners();
    const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage", otherAccount)
    console.log(simpleStorageFactory)
    const simpleStorage = await simpleStorageFactory.deploy()
    console.log(simpleStorage)
    const deployedContract = await simpleStorage.waitForDeployment()
    console.log(deployedContract)
    console.log(`SimpleStorage deployed as ${await simpleStorage.getAddress()}`)
    if (network.name === 'sepolia' && process.env.ETHERSCAN_API_KEY) {
        const receipt = await deployedContract.deploymentTransaction().wait(5, 60e3)
        console.log(receipt)
        await verify(await simpleStorage.getAddress(), [])
    }

    const favoriteNumber = await simpleStorage.retrieve()
    console.log(favoriteNumber)

    const storeTransaction = await simpleStorage.store(11)
    console.log(storeTransaction)
    const storeReceipt = await storeTransaction.wait()
    console.log(storeReceipt)

    console.log(await simpleStorage.retrieve())
}

async function verify(contractAddress, args) {
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
        console.log(contractAddress + " verified")
    }
    catch(e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        }
        else {
            console.log(e)
        }
    }
}

main()
.then(() => process.exit(0))
.catch(e => { console.log(e); process.exit(1) } )