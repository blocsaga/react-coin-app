import React, {useState} from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from 'components/Title';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { connect } from 'react-redux';
import {makeSelectAllCoin,makeSelectAllCoinLoading } from '../../App/selectors';
import { createStructuredSelector } from 'reselect';

import * as mapDispatchToProps from '../../App/actions'



 function searchBox(props) {
const [value, setValue] = useState(null);
  const {allCoin, allCoinLoading} = props;

const onChangeHandler =(e,v)=>{
  setValue(v);
  props.searchCoinRequest(v.id);
}




  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={allCoin && allCoin.map(coin=>{return {
        label:coin.name,
        ...coin
      }})}
      isOptionEqualToValue = {(opt,val)=>opt.label !==val.label}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search Cryptos" />}
      value = {value}
      onChange = {onChangeHandler}
    />
  );
}


const mapStateToProps = createStructuredSelector({
  allCoin: makeSelectAllCoin(),
  allCoinLoading:makeSelectAllCoinLoading()
});

export default connect(mapStateToProps, mapDispatchToProps)(searchBox);
