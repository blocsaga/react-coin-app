import * as React from 'react';
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








function preventDefault(event) {
  event.preventDefault();
}
 function CoinTable(props) {
const {allCoin, allCoinLoading} = props;
  return (
    <React.Fragment>
            <Title>Top Coins</Title>
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

export default connect(mapStateToProps)(CoinTable);
