import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from 'components/Title';

import { connect } from 'react-redux';
import {makeSelectFavCoin,makeSelectFavCoinLoading } from '../../App/selectors';
import { createStructuredSelector } from 'reselect';



function preventDefault(event) {
  event.preventDefault();
}

 function TopCrypto(props) {
  const {favCoin, favCoinLoading} = props;

  return (
    <React.Fragment>
      <Title>Watch List</Title>
{favCoinLoading && <h5>Loading...</h5>}


{favCoin &&  (<><Typography component="p" variant="h4">
       {`${'$'}${Math.round(favCoin.priceUsd).toFixed(2)}`}
      </Typography>
    
      <Typography color="text.secondary" sx={{ flex: 1 }}>
     {favCoin.name}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View detail
        </Link>
      </div></>) }

    
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  favCoin: makeSelectFavCoin(),
  favCoinLoading:makeSelectFavCoinLoading()
});

export default connect(mapStateToProps)(TopCrypto);
