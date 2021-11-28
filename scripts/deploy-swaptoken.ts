// https://docs.chain.link/docs/historical-price-data/
// npx hardhat run scripts/HistoricalPriceConsumerV3-deploy.ts --network kovan
import fs from "fs";
import { ethers , artifacts  } from "hardhat";  
import { Swaptoken } from "../typechain/Swaptoken";

async function main() {
  const contract = await ethers.getContractFactory("Swaptoken");
  const api = await contract.deploy();

  const [deployer] = await ethers.getSigners();
  console.log("Deployer account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const wmaticOutput = await api.estimateLinkToEth( ethers.utils.parseEther("1") )
  console.log("1 LINK = ", ethers.utils.formatEther(wmaticOutput) , " ETH")

  const ethOutput = await api.estimateEthcToLink( ethers.utils.parseEther("1") )
  console.log("1 ETH = ", ethers.utils.formatEther(ethOutput) , " LINK")

  const btcethOutput = await api.estimateBTCcToETH( ethers.utils.parseEther("1") )
  console.log("1 ETH = ", ethers.utils.formatEther(btcethOutput) , " BTC")

  const daiethOutput = await api.estimateDAItoETH( ethers.utils.parseEther("1") )
  console.log("1 ETH = ", ethers.utils.formatEther(daiethOutput) , " DAI")

  const usdtethOutput = await api.estimateUSDTtoETH( ethers.utils.parseEther("1") )
  console.log("1 ETH = ", ethers.utils.formatEther(usdtethOutput) , " USDT")

  const busdethOutput = await api.estimateBUSDtoETH( ethers.utils.parseEther("1") )
  console.log("1 ETH = ", ethers.utils.formatEther(busdethOutput) , " BUSD")
  

   //const swapEthLinkOutput = await api.swapEthToLink( ethers.utils.parseEther("0.01") )
   //console.log("Swap ETH/LINK ", ethers.utils.formatEther(ethOutput) , " LINK")

  //const roundId = BigInt("18446744073709562301")    // price: 36359000000
  //const roundId = BigInt("36893488147419113040")    // price: 473473000000
  //console.log('getHistoricalPrice: ' + await api.getHistoricalPrice(roundId) );

  //console.log('estimateLinkToMatic: ' + await api.estimateLinkToMatic(0.00001) );
  //console.log('estimateWmaticToLink: ' + await api.estimateWmaticToLink(20) );
  
  saveContract(api);

   function saveContract(api: Swaptoken) {
    const path = __dirname + '/../frontend/src/contracts';
    if (!fs.existsSync(path))
      fs.mkdirSync(path);
    fs.writeFileSync(`${path}/address.json`,
      JSON.stringify({ address: api.address }, undefined, 2))
    fs.writeFileSync(`${path}/abi.json`,
      JSON.stringify(artifacts.readArtifactSync('Swaptoken'), undefined, 2))
  }

}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
