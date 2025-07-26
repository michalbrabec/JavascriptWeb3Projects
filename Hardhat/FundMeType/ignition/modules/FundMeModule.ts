
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { priceFeeds } from "../../hardhat.config";
import { network } from "hardhat";

// npx hardhat ignition deploy ignition/modules/FundMeModule.ts --parameters ignition/parameters.json --network sepolia --verify

export default buildModule("FundMeModule", (m) => {
  const deployer = m.getAccount(1);

  const mock = priceFeeds[network.name]?
    m.contractAt("AggregatorV3Interface", priceFeeds[network.name]):
    m.contract("AggregatorV3Mock", [BigInt("300000000000")], {
        from: deployer,
      });

  const priceFeed = m.library("PriceFeed", {
    from: deployer,
  })

  const fundme = m.contract("FundMe", [1n, mock], {
    from: deployer,
    libraries: {
      PriceFeed: priceFeed,
    }
  })

  const minFunding = m.call(fundme, "MIN_FUNDING_USD", [], {
    from: deployer,
  })
  const latest = m.call(mock, "latestRoundData", [], {
    from: deployer,
    after: [minFunding]
  })
  m.call(fundme, "fund", [], {
    from: deployer,
    value: m.getParameter("funding")
  })

  return { mock, priceFeed, fundme };
});