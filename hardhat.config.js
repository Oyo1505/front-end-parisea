require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: { chainId: 1337 },
    mainnet: {
      url: "https://mainnet.infura.io/v3/fb3698f40fb249ef8629c08cbbec0dce",
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/fb3698f40fb249ef8629c08cbbec0dce",
      accounts: [
        "60c3b8601ad202ad5d18323c5fb2f2e63873d6b62e8e4a4e63a3b0e7720e0510",
      ],
    },
  },
};
