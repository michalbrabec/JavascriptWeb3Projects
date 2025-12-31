import { network } from "hardhat";

const { viem } = await network.connect({});
const publicClient = await viem.getPublicClient();
const [senderClient] = await viem.getWalletClients();
const tx = await senderClient.sendTransaction({
  to: senderClient.account.address,
  value: 1n,
  // gas: 60_000_000n,
});