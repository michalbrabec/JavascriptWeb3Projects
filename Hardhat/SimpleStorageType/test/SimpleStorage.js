const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  async function deployFixture() {
    const factory = await ethers.getContractFactory("SimpleStorage")
    const contract = await factory.deploy()
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

      const newVal = 55
      const response = await contract.store(newVal)

      assert.equal(await contract.retrieve(), newVal);
    });
    it("Should add a person to the internal array and mapping", async function () {
      const contract = await loadFixture(deployFixture);

      const name = 'john'
      const newVal = 55
      const response = await contract.addPerson(name, newVal)

      assert.equal(await contract.nameToFavoriteNumber(name), newVal);
    });
  });
});
