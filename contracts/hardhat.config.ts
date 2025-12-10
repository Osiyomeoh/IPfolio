import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "hardhat-gas-reporter";
import "solidity-coverage";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Story Aeneid Network (Chain ID 1315)
    aeneid: {
      url: process.env.RPC_URL || "https://story-testnet-evm.itrocket.net",
      chainId: 1315,
      accounts: process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.length >= 64
        ? [process.env.PRIVATE_KEY.startsWith('0x') ? process.env.PRIVATE_KEY : `0x${process.env.PRIVATE_KEY}`]
        : [],
      timeout: 120000,
    },
    // Story Odyssey Testnet (Chain ID 1516) - Official hackathon network
    odyssey: {
      url: process.env.RPC_URL || "https://story-odyssey-rpc.auranode.xyz",
      chainId: 1516,
      accounts: process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.length >= 64
        ? [process.env.PRIVATE_KEY.startsWith('0x') ? process.env.PRIVATE_KEY : `0x${process.env.PRIVATE_KEY}`]
        : [],
      timeout: 120000,
    },
    // Local development
    hardhat: {
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      odyssey: process.env.ETHERSCAN_API_KEY || "",
      aeneid: process.env.ETHERSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "odyssey",
        chainId: 1516,
        urls: {
          apiURL: "https://odyssey.storyscan.xyz/api",
          browserURL: "https://odyssey.storyscan.xyz",
        },
      },
      {
        network: "aeneid",
        chainId: 1315,
        urls: {
          apiURL: "https://aeneid.explorer.story.foundation/api",
          browserURL: "https://aeneid.explorer.story.foundation",
        },
      },
    ],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
