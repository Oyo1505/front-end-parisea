const hre = require("hardhat");
const fs = require('fs')
async function main() {
  const Market = await hre.ethers.getContractFactory("NFTMarket");
  const market = await Market.deploy();
  await market.deployed();
  console.log(`market contract deployed to ${market.address}`)

  const NFT = await hre.ethers.getContractFactory("NFT"); 
  const nft = await NFT.deploy(market.address);
  await nft.deployed();
  console.log(`nft contract deployed to ${nft.address}`)


  let config = `
  export const nftmarketaddress = "${market.address}"
  export const nftaddress = "${nft.address}"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });