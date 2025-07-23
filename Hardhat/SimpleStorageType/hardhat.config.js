require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify")
require('./tasks/accounts.js')
require('hardhat-gas-reporter')
require('solidity-coverage')
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      // first account does not exist
      accounts: ['02e159bb31383995a3398aa635d31f73aeec4f1a289b9aa4b96cb4a2895a06ef', 
        'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80']
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || '',
      // first account does not exist
      accounts: ['02e159bb31383995a3398aa635d31f73aeec4f1a289b9aa4b96cb4a2895a06ef', process.env.SEPOLIA_PRIVATE_KEY || '']
    }
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || ''
  },
  gasReporter: {
    enabled: true,
    // outputFile: 'gas-report.txt',
    // noColors: true,
    currency: 'USD',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || '',
    etherscan: process.env.ETHERSCAN_API_KEY || '',
  }
};
