// import "@nomicfoundation/hardhat-toolbox"
// import "@typechain/hardhat"
// import '@nomicfoundation/hardhat-ethers'
// import "dotenv/config"
// import "hardhat-deploy"

import "@nomicfoundation/hardhat-toolbox"
import "@nomicfoundation/hardhat-verify"
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import 'dotenv/config'
import '@nomicfoundation/hardhat-ethers'
import '@typechain/hardhat'
import 'hardhat-deploy'

export interface PriceFeed {
  [networkName: string]: string;
}

export const priceFeeds: PriceFeed = {
  sepolia: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
}

const config = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      // first account does not exist
      accounts: ['0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78699d', 
        '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'],
      chainId: 31337,
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || '',
      // first account does not exist
      accounts: ['02e159bb31383995a3398aa635d31f73aeec4f1a289b9aa4b96cb4a2895a06ef', process.env.SEPOLIA_PRIVATE_KEY || ''],
      chainId: 11155111,
    }
  },
  ignition: {

  },
  solidity: "0.8.24",
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
  },
  namedAccounts: {
    fake: {
      default: 0
    },
    deployer: {
      default: 1
    },
    friend: {
      default: 2,
      11155111: 1 // override for Sepolia (chainid)
    }
  }
}

export default config
