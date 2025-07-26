import { network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { FundMe } from "../typechain-types";
import { priceFeeds } from "../hardhat.config";
import verify from "../scripts/verify";

export default async function deployments(hre: HardhatRuntimeEnvironment): Promise<void> {
    const { deployer } = await hre.getNamedAccounts()
    // const chainId: number = network.config.chainId!

    const args = [ 50, priceFeeds[hre.network.name] ]
    const fundMe = await hre.deployments.deploy("FundMe", {
        contract: "FundMe",
        from: deployer,
        args,
        log: true,
        libraries: {
            PriceFeed: (await hre.deployments.get("PriceFeed")).address,
        }
    });
    
    const signer = await hre.ethers.getSigner(deployer)
    const contract: FundMe = await hre.ethers.getContractAt("FundMe", fundMe.address, signer)
    console.log(await contract.MIN_FUNDING_USD())

    if (network.name !== "hardhat" && network.name !== "localhost") {
        await verify(contract, args)
    }
    await contract.fund({
        value: 100000000000000000n,
        
    })
    // console.log(await contract.funders(0))
    // console.log(await hre.ethers.provider.getBalance(await contract.getAddress()))
    // await contract.withdraw()
    // console.log(await hre.ethers.provider.getBalance(await contract.getAddress()))
}