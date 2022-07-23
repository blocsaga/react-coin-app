/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, {useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Notifier from './components/Notifier';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import useInjectSaga from '../../hooks/useInjectSaga';
import useInjectReducer from '../../hooks/useInjectReducer';

import reducer from './reducer';
import saga from './saga';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from '../../global-styles';
import { connect } from 'react-redux';
import {makeSelectAllCoin, reduxKey } from './selectors';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from './actions';

const  App = (props)=> {
  useInjectReducer({ key: reduxKey,  reducer });
  useInjectSaga({ key: reduxKey, saga });


  // since this is component is the gateway to other component so  this will be the perfect place to fetch data required for homepage 
  useEffect(() => {
    props.loadAllCoinRequest();
    props.loadFavCoinRequest()
  }, []);
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Notifier />
      <ToastContainer hideProgressBar position="bottom-left" />
      <GlobalStyle />

    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  coinCap: makeSelectAllCoin(),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
