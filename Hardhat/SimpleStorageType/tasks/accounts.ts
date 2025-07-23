import { task } from "hardhat/config"

export default task("accounts", "Returns all connected accounts")
    .setAction(async (taskArgs, hre) => {
        console.log((await hre.ethers.getSigners()))
    })