import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { defineConfig } from "hardhat/config";

export default defineConfig({
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
    },
  },
  networks: {
    edr: {
      type: "edr-simulated",
      chainType: "l1",
      forking: {
        url: "https://ethereum-sepolia-rpc.publicnode.com"
      },
      hardfork: "osaka"
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: ["02e159bb31383995a3398aa635d31f73aeec4f1a289b9aa1b96cb4a2895a06ef"],
    },
  },
});