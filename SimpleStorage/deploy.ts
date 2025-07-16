import {
    JsonRpcProvider, 
    Wallet, 
    ContractFactory, 
    TransactionRequest, 
    TransactionReceipt,
    ContractDeployTransaction
} from "ethers"
import {config} from "dotenv"
import {promises} from "fs"
import { Provider } from "ethers"
import { BaseContract } from "ethers"
import { TransactionResponse } from "ethers"
import { Typed } from "ethers"

async function main(): Promise<void> {
    // setup
    config()
    if(!process.env.PRIVATE_KEY) {
        throw "Private key missing"
    }
    if(!process.env.RPC_URL) {
        throw "RPC URL missing"
    }
    console.log(process.env.PRIVATE_KEY)
    console.log(process.env.RPC_URL)

    const abi: string = await promises.readFile('./SimpleStorage_sol_SimpleStorage.abi', {encoding: 'utf8'})
    const bin: string = await promises.readFile('./SimpleStorage_sol_SimpleStorage.bin', {encoding: 'utf8'})
    
    // ethers setup
    const provider: Provider = new JsonRpcProvider(process.env.RPC_URL)
    const wallet: Wallet = new Wallet(process.env.PRIVATE_KEY, provider)
    console.log(wallet)

    // ethers contract setup
    const factory: ContractFactory<number[], BaseContract> = new ContractFactory(abi, bin, wallet)
    console.log(factory)
    const contract: any = await factory.deploy(10); // Contract constructor parameters
    console.log(contract)
    let response: TransactionResponse | null = contract.deploymentTransaction()
    console.log(response)
    let receipt: TransactionReceipt | undefined | null = await response?.wait(1)
    console.log(receipt)

    console.log('---------------------------------')
    const tx: ContractDeployTransaction = await factory.getDeployTransaction(10); // create contract transaction data encoding
    console.log(tx)
    console.log('---------------------------------')

    // manual contract setup
    const transaction: TransactionRequest = {
        nonce: await provider.getTransactionCount(wallet.address),
        gasPrice: 20000000000,
        gasLimit: 1000000,
        to: null,
        value: 0,
        data: '0x' + bin + '000000000000000000000000000000000000000000000000000000000000000a', // contract constructor parameter encoded into hex string of uint256
        chainId: 1337
    }
    console.log(transaction)
    const signed: string = await wallet.signTransaction(transaction)
    console.log(signed)
    response = await wallet.sendTransaction(transaction)
    console.log(response)
    receipt = await response.wait(1)
    console.log(receipt)

    // add user and get taht users number
    const newUser = await contract.addUser("joe", 11)
    console.log(newUser)
    console.log(await newUser.wait(1)) // adding user is a transaction so it must be resolved
    const userNumber = await contract.getNumber(Typed.string('joe'))
    console.log(userNumber) // getting the user number is a view function which does not need resolve
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error)
    process.exit(1)
})