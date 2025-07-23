import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { expect, assert } from "chai"
import { ethers } from "hardhat"
import { SimpleStorage, SimpleStorage__factory } from '../typechain-types'

describe("SimpleStorage", function () {
  async function deployFixture(): Promise<SimpleStorage> {
    const factory = await ethers.getContractFactory<any[], SimpleStorage>("SimpleStorage")
    const contract = (await factory.deploy()) as SimpleStorage
    const deployed = await contract.waitForDeployment()
    return deployed
  }

  describe("Retrieve", function () {
    it("Should start with favoriteNumber set to 0", async function () {
      const contract = await loadFixture(deployFixture);

      expect(await contract.retrieve()).to.equal(0);
    });
  });

  describe("Store", function () {
    it("Should set favoriteNumber", async function () {
      const contract = await loadFixture(deployFixture);

      const newVal: bigint = BigInt(55)
      const response = await contract.store(newVal)

      assert.equal(await contract.retrieve(), newVal);
    });
    it("Should add a person to the internal array and mapping", async function () {
      const contract = await loadFixture(deployFixture);

      const name = 'john'
      const newVal: bigint = BigInt(55)
      const response = await contract.addPerson(name, newVal)

      assert.equal(await contract.nameToFavoriteNumber(name), newVal);
    });
  });
});
