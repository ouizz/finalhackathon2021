//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Swaptoken {

    AggregatorV3Interface internal priceFeed;
    AggregatorV3Interface internal priceFeedBTCETH;
    AggregatorV3Interface internal priceFeedDAIETH;
    AggregatorV3Interface internal priceFeedUSDTETH;
    AggregatorV3Interface internal priceFeedBUSDETH;

    IERC20 public linkToken;
    IERC20 public ethToken;

    constructor() {
        //address payable owner;

        priceFeed = AggregatorV3Interface(0x3Af8C569ab77af5230596Acf0E8c2F9351d24C38); //LINK / ETH
        priceFeedBTCETH = AggregatorV3Interface(0xF7904a295A029a3aBDFFB6F12755974a958C7C25); //BTC / ETH  
        priceFeedDAIETH = AggregatorV3Interface(0x22B58f1EbEDfCA50feF632bD73368b2FdA96D541); //DAI / ETH  
        priceFeedUSDTETH = AggregatorV3Interface(0x0bF499444525a23E7Bb61997539725cA2e928138); //USDT / ETH
        priceFeedBUSDETH = AggregatorV3Interface(0xbF7A18ea5DE0501f7559144e702b29c55b055CcB); //BUSD / ETH

        linkToken = IERC20(0xa36085F69e2889c224210F603D836748e7dC0088);
        ethToken = IERC20(0xd0A1E359811322d97991E03f863a0C30C2cF029C);
    }

    function swapLinkToWmatic(uint256 _amount) public {
        // transfer LINK to this contract
        linkToken.transferFrom( address(msg.sender), address(this) , _amount );
        int rate = getCurrentPrice();
        uint256 result = (_amount * uint256(rate)) / (10**18);
        ethToken.transfer(msg.sender, result);
    }
    function estimateLinkToEth(uint256 _amount) public view returns (uint256) {
        int rate = getCurrentPrice();
        uint256 result = (_amount * uint256(rate)) / (10**18);
        return result;
    }
    function swapEthToLink(uint256 _amount) public {
        // transfer WMATIC to this contract
        ethToken.transferFrom( address(msg.sender), address(this) , _amount );
        int rate = (10**36) / getCurrentPrice();
        uint256 result = (_amount * uint256(rate)) / (10**18);
        linkToken.transfer(msg.sender, result);
    }
    
    function estimateEthcToLink(uint256 _amount) public view returns (uint256) {
        int rate = (10**36) / getCurrentPrice();
        uint256 result = (_amount * uint256(rate)) / (10**18);
        return result;
    }
    function estimateBTCcToETH(uint256 _amount) public view returns (uint256) {
        int rate = (10**36) / getCurrentPriceBTCETH();
        uint256 result = (_amount * uint256(rate)) / (10**18);
        return result;
    }
    function estimateDAItoETH(uint256 _amount) public view returns (uint256) {
        int rate = (10**36) / getCurrentPriceDAIETH();
        uint256 result = (_amount * uint256(rate)) / (10**18);
        return result;
    }
    function estimateUSDTtoETH(uint256 _amount) public view returns (uint256) {
        int rate = (10**36) / getCurrentPriceUSDTETH();
        uint256 result = (_amount * uint256(rate)) / (10**18);
        return result;
    }
    function estimateBUSDtoETH(uint256 _amount) public view returns (uint256) {
        int rate = (10**36) / getCurrentPriceBUSDETH();
        uint256 result = (_amount * uint256(rate)) / (10**18);
        return result;
    }
    

    function getCurrentPrice() public view returns (int) {
        (
            , 
            int price,
            ,
            ,
        ) = priceFeed.latestRoundData();
        return price;
    }
    function getCurrentPriceBTCETH() public view returns (int) {( , int price , , , ) = priceFeedBTCETH.latestRoundData();
        return price;
    }
    function getCurrentPriceDAIETH() public view returns (int) {( , int price , , , ) = priceFeedDAIETH.latestRoundData();
        return price;
    }
    function getCurrentPriceUSDTETH() public view returns (int) {( , int price , , , ) = priceFeedUSDTETH.latestRoundData();
        return price;
    }
    function getCurrentPriceBUSDETH() public view returns (int) {( , int price , , , ) = priceFeedBUSDETH.latestRoundData();
        return price;
    }
    

    function currentLinkBalance() public view returns (uint256) {
        return linkToken.balanceOf(address(this));
    }
    function currentWmaticBalance() public view returns (uint256) {
        return ethToken.balanceOf(address(this));
    }
    function depositLink(uint256 _amount) public {
        linkToken.transferFrom( address(msg.sender), address(this) , _amount );
    }
    function depositWmatic(uint256 _amount) public {
        ethToken.transferFrom( address(msg.sender), address(this) , _amount );
    }   
    function withdrawLink(uint256 _amount) public {
        linkToken.transfer(msg.sender, _amount);
    }
    function withdrawWmatic(uint256 _amount) public {
        ethToken.transfer(msg.sender, _amount);
    }
    
}

