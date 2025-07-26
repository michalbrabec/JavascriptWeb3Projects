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

    const contract: FundMe = await ethers.getContractAt("FundMe", await fundme.getAddress())
    const accounts = await getNamedAccounts()

    expect(await ethers.provider.getBalance(await contract.getAddress())).to.equal(initialFunding)

    expect(await contract.s_funders(0)).to.equal(accounts.deployer)
    expect(await contract.s_funding(accounts.deployer)).to.equal(initialFunding)

    for (let index = 0; index < 10; index++) {
      console.log(await ethers.provider.getStorage(await contract.getAddress(), index))
    }
  })
})
