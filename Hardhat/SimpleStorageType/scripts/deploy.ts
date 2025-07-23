import { ethers, run, network } from "hardhat"
import { Contract } from 'ethers'

async function wait(ms: number) {
    return new Promise<void>(res => setTimeout(res, ms))
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
    if (network.name === 'sepolia') {
        await verify(simpleStorage, [])
    }

    const favoriteNumber = await simpleStorage.retrieve()
    console.log(favoriteNumber)

    const storeTransaction = await simpleStorage.store(11)
    console.log(storeTransaction)
    const storeReceipt = await storeTransaction.wait()
    console.log(storeReceipt)

    console.log(await simpleStorage.retrieve())
}

async function verify(contract: Contract, args: (string | number)[]): Promise<void> {
    try {
        const contractAddress: string = await contract.getAddress()
        console.log(`Verifying ${contractAddress}`)
        if (!process.env.ETHERSCAN_API_KEY) { throw Error("Etherscan API key missing") }
        if (!contract.deploymentTransaction()) { throw Error("Contract deployment failed") }
        const receipt = await contract.deploymentTransaction()!.wait(5, 60e3)
        console.log(receipt)
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
        console.log(contractAddress + " verified")
    }
    catch(e: any) {
        if (e.message.toLowerCase().includes("already been verified")) {
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