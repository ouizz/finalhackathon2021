import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Container , Row , Col , Button } from 'react-bootstrap';

import { ethers } from "ethers";
import { address } from './contracts/address.json';
import { abi } from './contracts/abi.json';

import { PriceConsumer } from "../../typechain/PriceConsumer";
import { Web3Provider, JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";

let provider: Web3Provider | JsonRpcProvider;
let signer: JsonRpcSigner
let api: PriceConsumer;

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [addressWallet, setAddressWallet] = useState('0x');
  const [count, setCount] = useState(0)
  const [countdata] = useState(0);

  const [withdrawMoney , setWithdraweMoney] = useState('');
  const [balance , setBlance] = useState('0');

  async function connect() {
    provider = new ethers.providers.Web3Provider((window as any).ethereum)
    await provider.send('eth_requestAccounts', []); // ethereum.enable()
    signer = provider.getSigner();
    console.log('signer: ', signer); 
    api = new ethers.Contract(address, abi, signer) as PriceConsumer;
    console.log('signer: ', await signer.getAddress() ); 

    setAddressWallet(await signer.getAddress());

  }

  async function connectwallet(countdata: number) {
    console.log('proposal: ', countdata);
  }

  async function getPriceEthToLink() {
    if ( api === undefined)
      await connect();

    //console.log('BTC: ' +  BTC);
    //console.log('USD: ' +  USD);
    
    //const price = await api.getPrice(BTC,USD);
    //console.log('price BTC/USD: ' +  price);
    
    const priceEthToLink = await api.estimateEthcToLink( ethers.utils.parseEther("1") );
    console.log('Price ETH/LINK : ' , (Number(priceEthToLink) / (10**18))  );
    console.log('Price ETH/LINK : ' , ethers.utils.formatEther(priceEthToLink)   );
  }

  async function swapEthToLink(_amount:Number) {
     if ( api === undefined)
      await connect();

    console.log('Amount: ' + _amount);
    const swapEthToLink = await api.swapEthToLink(  ethers.utils.parseEther("0.01") ); 
  }

  async function checkBalance(){
     if ( api === undefined)
      await connect();

      //const tx = await api.connect(signer).checkBalance();  
      const tx = await api.estimateEthcToLink( ethers.utils.parseEther("1") );
      setBlance( Number(tx).toString() ); 
  }

  async function setWithdraw() {
     if ( api === undefined)
      await connect();
      const tx = await api.estimateEthcToLink( ethers.utils.parseEther(withdrawMoney) );
     //await tx.wait();
      setBlance( ethers.utils.formatEther(tx) + " LINK" ); 
  }

  async function setWithdrawBTC() {
     if ( api === undefined)
      await connect();
      const tx = await api.estimateBTCcToETH( ethers.utils.parseEther(withdrawMoney) );
      setBlance( ethers.utils.formatEther(tx) + " BTC" ); 
  }

  async function setWithdrawDAI(){
    if ( api === undefined)
      await connect();
      const tx = await api.estimateDAItoETH( ethers.utils.parseEther(withdrawMoney) );
      setBlance( ethers.utils.formatEther(tx) + " DAI" ); 
  }

  async function setWithdrawUSDT() {
    if ( api === undefined)
      await connect();
      const tx = await api.estimateUSDTtoETH( ethers.utils.parseEther(withdrawMoney) );
      setBlance( ethers.utils.formatEther(tx) + " USDT" ); 
  }

  async function setWithdrawBUSD() {
     if ( api === undefined)
      await connect();
      const tx = await api.estimateBUSDtoETH( ethers.utils.parseEther(withdrawMoney) );
      setBlance( ethers.utils.formatEther(tx) + " BUSD" ); 
  }

  return (<div>
      <Container>
        <br/>
        
        <Row xs={12} md={12} >
          <Col> <h5>Exchange Calculator</h5> </Col>
          <Col> 
            <Button  className="pull-right" variant="success" onClick={() => connect()}>Connect wallet</Button ><br clear='both'/>
            <div className="pull-right" >{ !addressWallet ? 'Connect Wallet' : addressWallet.slice(0,5) + '...' + addressWallet.slice(-3) }</div>
          </Col>
        </Row>

        <br/>

        <Row xs={8} md={8} >
          <Col>
            <div>
            <div>ETH/LINK:</div>
            <input className="inputbox" type="text" onChange={ (e)=> setWithdraweMoney(e.target.value) } placeholder="1 ETH"/> 
            <Button 
              variant="primary"
              onClick={ ()=> setWithdraw() } 
            >ETH/LINK</Button> 
          </div>
          </Col>
        </Row>

        <hr/>

        <Row xs={8} md={8} >
          <Col>
            <div>
            <div>ETH/BTC:</div>
            <input className="inputbox" type="text" onChange={ (e)=> setWithdraweMoney(e.target.value) } placeholder="1 ETH"/> 
            <Button 
              variant="danger"
              onClick={ ()=> setWithdrawBTC() } 
            >ETH/BTC</Button> 
          </div>
          </Col>
        </Row>

        <hr/>

        <Row xs={8} md={8} >
          <Col>
            <div>
            <div>ETH/DAI:</div>
            <input className="inputbox" type="text" onChange={ (e)=> setWithdraweMoney(e.target.value) } placeholder="1 ETH"/> 
            <Button 
              variant="warning"
              onClick={ ()=> setWithdrawDAI() } 
            >ETH/DAI</Button> 
          </div>
          </Col>
        </Row>

        <hr/>

        <Row xs={8} md={8} >
          <Col>
            <div>
            <div>ETH/USDT:</div>
            <input className="inputbox" type="text" onChange={ (e)=> setWithdraweMoney(e.target.value) } placeholder="1 ETH"/> 
            <Button 
              variant="info"
              onClick={ ()=> setWithdrawUSDT() } 
            >ETH/USDT</Button> 
          </div>
          </Col>
        </Row>

        <hr/>

        <Row xs={8} md={8} >
          <Col>
            <div>
            <div>ETH/BUSD:</div>
            <input className="inputbox" type="text" onChange={ (e)=> setWithdraweMoney(e.target.value) } placeholder="1 ETH"/> 
            <Button 
              variant="dark"
              onClick={ ()=> setWithdrawBUSD() } 
            >ETH/BUSD</Button> 
          </div>
          </Col>
        </Row>

        <Row xs={8} md={8} >
          <Col>
             <div className="display-cal"><b> { balance } </b></div>
          </Col>
        </Row>


      </Container>

   </div>
  )

}

export default App

