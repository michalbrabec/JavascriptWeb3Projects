import hre from "hardhat"
import { FundMe } from "../typechain-types"
import { readFileSync } from 'fs'
import { join } from 'path'
import { sign } from "crypto"

JSON.parse


async function fund() {
    const deployed = readFileSync(join(__dirname, '..', 'ignition', 'deployments', 'chain-11155111', 'deployed_addresses.json'), 'utf8')
    const address = JSON.parse(deployed)['FundMeModule#FundMe']
    
    console.log(await hre.ethers.provider.getBalance(address))
    const signer = await hre.ethers.provider.getSigner('0x2a06A1dA3f9F4933c6E1f937D4C395539AB20dbb')
    const contract: FundMe = await hre.ethers.getContractAt("FundMe", 
        address, signer)
    console.log(await contract.OWNER())
    const funding = await contract.fund({value:1000000000000000n})
    await funding.wait(1)
    console.log(await hre.ethers.provider.getBalance(address))
}

fund().then(() => console.log("Funded")).catch(e => console.log(e))