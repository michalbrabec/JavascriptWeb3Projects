import { run } from "hardhat"
import { BaseContract } from 'ethers'

export default async function verify(contract: BaseContract, args: (string | number)[]): Promise<void> {
    try {
        const contractAddress: string = await contract.getAddress()
        console.log(`Verifying ${contractAddress}`)
        if (!process.env.ETHERSCAN_API_KEY) { throw Error("Etherscan API key missing") }
        // if (!contract.deploymentTransaction()) { throw Error("Contract deployment failed") }
        // const receipt = await contract.deploymentTransaction()!.wait(5, 60e3)
        // console.log(recxeipt)
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