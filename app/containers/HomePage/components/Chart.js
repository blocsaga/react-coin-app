import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label,Tooltip, ResponsiveContainer,CartesianGrid,Legend } from 'recharts';
import Title from 'components/Title';
import { connect } from 'react-redux';
import {makeSelectSearchName,makeSelectSearchCoin,makeSelectSearchCoinLoading  } from '../../App/selectors';
import { createStructuredSelector } from 'reselect';


 


// Generate  Data









  
   function Chart(props) {

    const{searchName,coin, loading} = props;

    const theme = useTheme();
  
    return (
      <React.Fragment>
        <Title>{'Search Results (24 hrs)'} <strong>{searchName && searchName.toUpperCase()}</strong></Title>
        {loading &&  <i><h6>Finding your coins...</h6></i>}


  
        {!loading && Object.keys(coin).length>0 && (
                   <ResponsiveContainer width="100%" height="100%">
                   <LineChart
                     width={500}
                     height={300}
                     data={coin}
                     margin={{
                       top: 5,
                       right: 30,
                       left: 20,
                       bottom: 5,
                     }}
                   >
                     <CartesianGrid strokeDasharray="2 2" />
                     <XAxis dataKey="time" />
                     <YAxis dataKey="priceUsd" />
                     <Tooltip />
                     <Legend />
                     <Line type="monotone" dataKey="priceUsd" stroke="#8884d8"  />
                   </LineChart>
                 </ResponsiveContainer>
)}
  
      </React.Fragment>
    );
  }
  

  const mapStateToProps = createStructuredSelector({
    coin: makeSelectSearchCoin(),
    searchName:makeSelectSearchName(),
    loading:makeSelectSearchCoinLoading(),
  });
  
  export default connect(mapStateToProps)(Chart);


  

 