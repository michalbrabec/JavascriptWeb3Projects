import hre from "hardhat"
import { FundMe } from "../typechain-types"
import { readFileSync } from 'fs'
import { join } from 'path'


async function withdraw() {
    const deployed = readFileSync(join(__dirname, '..', 'ignition', 'deployments', 'chain-11155111', 'deployed_addresses.json'), 'utf8')
    const address = JSON.parse(deployed)['FundMeModule#FundMe']
    
    console.log(await hre.ethers.provider.getBalance(address))
    const signer = await hre.ethers.provider.getSigner('0x2a06A1dA3f9F4933c6E1f937D4C395539AB20dbb')
    const contract: FundMe = await hre.ethers.getContractAt("FundMe", 
        address, signer)
    console.log(await contract.OWNER())
    const withdraw = await contract.withdraw()
    await withdraw.wait(1)
    console.log(await hre.ethers.provider.getBalance(address))
}

withdraw().then(() => console.log("Withdrawn")).catch(e => console.log(e))