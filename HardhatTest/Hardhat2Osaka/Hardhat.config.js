require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      hardfork: "osaka"
    },
    edr: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      // first account does not exist
      accounts: ['02e159bb31383995a3398aa635d31f73aeec4f1a289b9aa1b96cb4a2895a06ef'],
      hardfork: "osaka"
    }
  }
};