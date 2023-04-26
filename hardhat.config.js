/** @type import('hardhat/config').HardhatUserConfig */
require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-etherscan")
require("dotenv").config();

const {
  KEY,
  ALCHEMY_API_KEY,
  SEPOLIA_PRIVATE_KEY1,
  SEPOLIA_PRIVATE_KEY2,
  SEPOLIA_PRIVATE_KEY3,
  ETHERSCAN_KEY
} = process.env;

module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${KEY}`,
      },
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [
        SEPOLIA_PRIVATE_KEY1,
        SEPOLIA_PRIVATE_KEY2,
        SEPOLIA_PRIVATE_KEY3,
      ],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  }
};
 