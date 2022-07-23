import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectRouter = (state) => state.router;
export const reduxKey = 'global';

export const makeSelectLocation = () =>
  createSelector(selectRouter, (routerState) => routerState.location);
  
const selectGlobal = (state) => state[reduxKey] || initialState;

export const makeSelectNotifications = () =>
  createSelector(selectGlobal, (state) => state.notifications);

  export const makeSelectAllCoin = () =>
  createSelector(selectGlobal, (state) => state.allCoin);

  export const makeSelectAllCoinLoading = () =>
  createSelector(selectGlobal, (state) => state.allCoinLoading);


  export const makeSelectFavCoin = () =>
  createSelector(selectGlobal, (state) => state.favCoin);

  export const makeSelectFavCoinLoading = () =>
  createSelector(selectGlobal, (state) => state.favCoinLoading);


  export const makeSelectSearchCoin = () =>
  createSelector(selectGlobal, (state) => state.searchCoin);

  export const makeSelectSearchCoinLoading = () =>
  createSelector(selectGlobal, (state) => state.searchCoinLoading);

  
  export const makeSelectSearchName = () =>
  createSelector(selectGlobal, (state) => state.searchName);