import { HardhatRuntimeEnvironment } from "hardhat/types";
import { PriceFeed } from "../typechain-types";
import { priceFeeds } from "../hardhat.config";
import { network } from "hardhat";
import verify from "../scripts/verify";

export default async function deployments(hre: HardhatRuntimeEnvironment): Promise<void> {
    const { deployer } = await hre.getNamedAccounts()

    const library = await hre.deployments.deploy("PriceFeed", {
        contract: "PriceFeed",
        from: deployer,
        args: [],
        log: true
    })
    const contract: PriceFeed = await hre.ethers.getContractAt("PriceFeed", library.address)
    console.log(priceFeeds[hre.network.name])
    console.log(await contract.ethToUsd(BigInt("1000000000000000000"), priceFeeds[hre.network.name]))

    if (network.name !== "hardhat" && network.name !== "localhost") {
        await verify(contract, [])
    }
}