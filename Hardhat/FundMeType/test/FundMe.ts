import { ethers, getNamedAccounts, ignition } from "hardhat"
import FundMeModule from "../ignition/modules/FundMeModule"
import { expect } from "chai"
import { FundMe, PriceFeed, AggregatorV3Interface } from "../typechain-types"

describe("FundMe", function () {
  it("contract is correctly initialized", async function () {
    const initialFunding = 1000000000000000n
    const { mock, priceFeed, fundme } =
      await ignition.deploy(FundMeModule, {
        parameters: {
          "FundMeModule": {
            "funding": initialFunding,
          }
        }
      })
      
    
    const accounts = await getNamedAccounts()
    const contract: FundMe = await ethers.getContractAt("FundMe", await fundme.getAddress(), 
      await ethers.provider.getSigner(accounts.deployer))
    
    expect(await ethers.provider.getBalance(await contract.getAddress())).to.equal(initialFunding)

    const owner = await contract.OWNER()
    expect(owner).to.equal(accounts.deployer)
    expect(await contract.MIN_FUNDING_CENT()).to.equal(100)
    expect(await contract.getMinFundingWei()).to.equal(333333333333333)
    expect(await contract.s_funders(0)).to.equal(accounts.deployer)
    await expect(contract.s_funders(1)).to.be.reverted
    expect(await contract.s_funding(accounts.deployer)).to.equal(initialFunding)
    await expect(contract.fund({value:10n})).to.be.revertedWithCustomError(contract, 'InsuffiecientFunds')
    expect(await contract.withdraw()).to.not.be.reverted

    for (let index = 0; index < 10; index++) {
      console.log(await ethers.provider.getStorage(await contract.getAddress(), index))
    }
  })
})
