import React, { useState, useEffect, useRef } from "react";
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from 'components/Title';

import { connect } from 'react-redux';
import {makeSelectAllCoin,makeSelectAllCoinLoading } from '../../App/selectors';
import { createStructuredSelector } from 'reselect';
import { toPairs } from "lodash";
import { ws } from "./ws";
// import WebSocket from 'websocket';






function preventDefault(event) {
  event.preventDefault();
}




 function CoinTableStream(props) {
const {allCoin, allCoinLoading} = props;


// data structure like below will be created in redux StorageEvent.

// const dataStructure = {
//   currencies:"",
//   pair:"",
//   price:"",
// history: {}
// }


// created to create a reference object so it can not be recreated on every render 
const wsRef = useRef(null);
const firstRender = useRef(false);
// first render
useEffect((()=>{
  const ws = new WebSocket('wss://ws.coincap.io/trades/binance');

  // we only put required pairs in the below array 
  let pairs = []; 


// with below procedure we make those data easy to read by viewers by sorting each of them

// first we need to fech all the available currency toPairs throuch api call 
// and then with response data we only filter those currencies we need to show
// we make order of currencies
// we put the filtered currencies in currencies of redux store


// we tell the app that the first rendered is document  
// firstRender.current = true
}),[]);



// now the next render 

useEffect(()=>{

// if first hook is not rendered then we return this second render 
// if (!firstRender.current) return;

// this time according to the api documentation we can communicate to the websocket of the server like in HTMLOptionsCollection, we exchange data betn 

// we ask server (through https) to send history of the pair we requested  
// if we get data then we set history with the data we get 

// till this period of time we have history of pairs we want 
// now we need to know the like value of those pairs with the help of websocket
// ws.current.onmessage=  (e)=> setData(e.data)
// if the pair mactches we set price accordingly 


}, [pair])
// if pair changes we rerender 

// there is more to be done with websocket.

  return (
    <React.Fragment>
            <Title>Top Coins (Live)</Title>
<Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>MarketCap</TableCell>
            <TableCell>VWAP(24hr)</TableCell>
            <TableCell>Supply	</TableCell>
            <TableCell>Volume(24hr)</TableCell>
            <TableCell align="right">Change%(24hr)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {allCoin && allCoin.map((coin) => (
            <TableRow key = {coin.rank}>
            <TableCell>{coin.rank}</TableCell>
            <TableCell>{coin.name}</TableCell>
            <TableCell>{`${"$"}${Math.round(coin.priceUsd)}`}</TableCell>
            <TableCell>{Math.round(coin.marketCapUsd)}</TableCell>
            <TableCell>{Number(coin.vwap24Hr).toFixed(2)}</TableCell>
            <TableCell>{Number(coin.supply).toFixed(2)}</TableCell>
            <TableCell>{Number(coin.volumeUsd24Hr).toFixed(8)}</TableCell>
            <TableCell align="right">{Number(coin.changePercent24Hr).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more other Crypto coins.
      </Link>
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  allCoin: makeSelectAllCoin(),
  allCoinLoading:makeSelectAllCoinLoading()
});

export default connect(mapStateToProps)(CoinTableStream);
