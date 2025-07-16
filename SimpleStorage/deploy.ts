import {JsonRpcProvider, Wallet} from "ethers"
import {config} from "dotenv"
import {promises} from "fs"

async function main(): Promise<void> {
    config()

    const abi: string = await promises.readFile('./SimpleStorage_sol_SimpleStorage.abi', {encoding: 'utf8'})
    const bin: string = await promises.readFile('./SimpleStorage_sol_SimpleStorage.bin', {encoding: 'utf8'})
    
    const provider = new JsonRpcProvider(process.env.RPC_URL)

    if(!process.env.PRIVATE_KEY) {
        throw "Private key missing"
    }
    const wallet = new Wallet(process.env.PRIVATE_KEY, provider)
    console.log(wallet)
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error)
    process.exit(1)
})