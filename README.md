## Exchange Calculator
* Oracle is the way to access the real world data or events. 
* This example is based on Kovan network.
* Don't forget to configure .env.example (Change to .env and put the right URL and private key)

#### Download and Install
```shell
git clone https://github.com/ouizz/datafeed
cd datafeed
npm i
```

#### Swaptoken example (Kovan)
```
npx hardhat run scripts/deploy-swaptoken.ts --network kovan
```