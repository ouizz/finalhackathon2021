## Exchange Calculator
* Oracle is the way to access the real world data or events. 
* This example is based on Kovan network.
* Don't forget to configure .env.example (Change to .env and put the right URL and private key)

#### Download and Install
```shell
git clone https://github.com/ouizz/finalhackathon2021
cd finalhackathon2021
npm i
```

#### Frontend and Install
```shell
cd frontend
npm i
```

#### Swaptoken example (Kovan)
```
npx hardhat run scripts/deploy-swaptoken.ts --network kovan
```