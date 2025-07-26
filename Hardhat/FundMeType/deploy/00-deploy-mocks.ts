import { HardhatRuntimeEnvironment, HttpNetworkUserConfig } from "hardhat/types";
import { AggregatorV3Mock } from "../typechain-types/contracts/test/AggregatorV3Mock"
import { priceFeeds } from "../hardhat.config";
import { network } from "hardhat";

export default async function deployments(hre: HardhatRuntimeEnvironment): Promise<void> {
    const { deployer } = await hre.getNamedAccounts()

    if (!priceFeeds[network.name]) {
        const mock = await hre.deployments.deploy("AggregatorV3Mock", {
            contract: "AggregatorV3Mock",
            from: deployer,
            args: [ 3000e8 ],
            log: true
        })
        const contract: AggregatorV3Mock = await hre.ethers.getContractAt("AggregatorV3Mock", mock.address)
        console.log((await contract.latestRoundData()).answer)
        priceFeeds[network.name] = mock.address
    }
}