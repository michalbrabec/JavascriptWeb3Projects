import {
    JsonRpcProvider, 
    Wallet, 
    ContractFactory, 
    TransactionRequest, 
    TransactionReceipt,
    ContractDeployTransaction,
    Provider,
    BaseContract,
    TransactionResponse,
    Typed,
    ethers
} from "ethers"
import {config} from "dotenv"
import {promises} from "fs"

async function main(): Promise<void> {
    // setup
    config()
    if(!process.env.PRIVATE_KEY) {
        throw "Private key missing"
    }
    if(!process.env.RPC_URL) {
        throw "RPC URL missing"
    }
    if(!process.env.PASSWORD) {
        throw "Password missing"
    }
    console.log(process.env.PRIVATE_KEY)
    console.log(process.env.RPC_URL)
    console.log(process.env.PASSWORD)

    const abi: string = await promises.readFile('./SimpleStorage_sol_SimpleStorage.abi', {encoding: 'utf8'})
    const bin: string = await promises.readFile('./SimpleStorage_sol_SimpleStorage.bin', {encoding: 'utf8'})
    
    // ethers setup
    const provider: Provider = new JsonRpcProvider(process.env.RPC_URL)
    const wallet: Wallet = new Wallet(process.env.PRIVATE_KEY)
    console.log(wallet)
    const encrypted: string = await wallet.encrypt(process.env.PASSWORD)
    console.log(encrypted)
    await promises.writeFile('./private_key.json', encrypted)

    const encryptedKey:string = await promises.readFile('./private_key.json', {encoding: 'utf8'})
    const encryptedWallet: Wallet = Wallet.fromEncryptedJsonSync(encryptedKey, process.env.PASSWORD) as Wallet
    console.log(encryptedWallet)
    encryptedWallet.connect(provider)
    console.log(encryptedWallet)

    // ethers contract setup
    const factory: ContractFactory<number[], BaseContract> = new ContractFactory(abi, bin, encryptedWallet)
    console.log(factory)
    const contract: any = await factory.deploy(10); // Contract constructor parameters
    console.log(contract)
    let response: TransactionResponse | null = contract.deploymentTransaction()
    console.log(response)
    let receipt: TransactionReceipt | undefined | null = await response?.wait(1)
    console.log(receipt)

    // manual contract setup
    const transaction: TransactionRequest = {
        nonce: await provider.getTransactionCount(encryptedWallet.address),
        gasPrice: 20000000000,
        gasLimit: 1000000,
        to: null,
        value: 0,
        data: '0x' + bin + '000000000000000000000000000000000000000000000000000000000000000a', // contract constructor parameter encoded into hex string of uint256
        chainId: 1337
    }
    console.log(transaction)
    const signed: string = await encryptedWallet.signTransaction(transaction)
    console.log(signed)
    response = await encryptedWallet.sendTransaction(transaction)
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