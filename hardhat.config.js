require("@nomiclabs/hardhat-waffle");


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks :{
    hardhat:{chainId : 1337},
    ropsten : {
      url :'https://ropsten.infura.io/v3/ec8f75d0330640388259d86948b4d0d9',
      accounts:["8606388592c91a0f36a8cb286271cf849f842e09ffcad1640f74df96f3da7046"],
    }
  }
};
