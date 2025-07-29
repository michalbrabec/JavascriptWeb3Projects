import { ethers } from "./ethers.min.js";
import { fundMeAbi, fundMeAddress } from "./constants.js";

const connect = document.getElementById("connect")
const balance = document.getElementById("balance")
const getBalance = document.getElementById("getBalance")
const owner = document.getElementById("owner")
const getOwner = document.getElementById("getOwner")
const minFunding = document.getElementById("minFunding")
const getMinFunding = document.getElementById("getMinFunding")
const funding = document.getElementById("funding")
const fund = document.getElementById("fund")
const withdraw = document.getElementById("withdraw")
const message = document.getElementById("message")

let provider = undefined
let signer = undefined
let contract = undefined

function disableButton(button) {
    button.classList.add("disabled_button")
    button.classList.remove("button")
    button.onclick = null
}
function enableButton(button) {
    button.classList.remove("disabled_button")
    button.classList.add("button")
}

async function connectWallet() {
    try {
        provider = new ethers.BrowserProvider(window.ethereum)
        signer = await provider.getSigner()
        contract = new ethers.Contract(fundMeAddress, fundMeAbi, signer)

        const buttons = document.getElementsByClassName('disabled_button')
        while (buttons.length > 0) {
            enableButton(buttons[0])
        }
        disableButton(connect)
        connect.onclick = null
        getBalance.onclick = getContractBalance
        getOwner.onclick = getContractOwner
        getMinFunding.onclick = getContractMinFunding
        fund.onclick = fundContract
        withdraw.onclick = withdrawFromContract
        message.innerHTML = ""
        connect.innerHTML = "Connected"

        const handle = setInterval(async () => {
            if (!(await provider.hasSigner())) {
                message.innerHTML = "Wallet manager disconnected"

                const buttons = document.getElementsByClassName('button')
                while (buttons.length > 0) {
                    disableButton(buttons[0])
                }
                enableButton(connect)
                connect.innerHTML = "Connect"
                connect.onclick = connectWallet
                clearInterval(handle)
            }
        }, 1000);
    }
    catch (e) {
        message.innerHTML = "Wallet connection failed"
    }
}

async function getContractBalance() {
    if (provider) {
        balance.innerHTML = await provider.getBalance(fundMeAddress)
    }
    else {
        message.innerHTML = "Wallet not connected"
    }
}

async function getContractOwner() {
    if (contract) {
        owner.innerHTML = await contract.OWNER()
    }
    else {
        message.innerHTML = "Wallet not connected"
    }
}

async function getContractMinFunding() {
    if (contract) {
        minFunding.innerHTML = Number(await contract.getMinFundingWei())// / Number(1000000000000000000n)
    }
    else {
        message.innerHTML = "Wallet not connected"
    }
}

async function fundContract() {
    if (contract) {
        try {
            await contract.on("Funded", (from, value, event) => {
                message.innerHTML = `Contract funded with ${value} wei`
            });
            const response = await contract.fund({ value: funding.value })
            await response.wait(1)
            provider.once(response.hash, async receipt => {
                console.log(`funded with ${await receipt.confirmations()} confirmations`)
            })
        }
        catch { message.innerHTML = "Funding too low" }
    }
    else {
        message.innerHTML = "Wallet not connected"
    }
}

async function withdrawFromContract() {
    if (contract) {
        try {
            await contract.on("Withdrawn", (by, value, event) => {
                message.innerHTML = `Owner withdrawn ${value} wei`
            });

            await contract.withdraw()
        }
        catch { message.innerHTML = "Access denied" }
    }
    else {
        message.innerHTML = "Wallet not connected"
    }
}

async function verifyWallet() {
    if (window.ethereum) {
        enableButton(connect)
        connect.onclick = connectWallet
        if (await new ethers.BrowserProvider(window.ethereum).hasSigner()) {
            connectWallet()
        }
    }
    else {
        message.innerHTML = 'Please install wallet manager like <a href="https://home.metamask.io" target="_blank">Metamask</a>'
    }
}

verifyWallet().then().catch(e => alert(e))
