import * as types from "./constants";
export const enqueueSnackbar = (notification) => ({
    type: types.ENQUEUE_SNACKBAR,
    payload: notification,
  });
  
  export const removeSnackbar = (payload) => ({
    type: types.REMOVE_SNACKBAR,
    payload,
  });

  export const networkError = (token) => ({type: types.NETWORK_ERROR,
    payload: token});

  

  export const loadAllCoinRequest = (payload) => ({
    type: types.LOAD_ALLCOIN_REQUEST,
    payload,
  });
  export const loadAllCoinSuccess = (payload) => ({
    type: types.LOAD_ALLCOIN_SUCCESS,
    payload,
  });
  export const loadAllCoinFailure = (payload) => ({
    type: types.LOAD_ALLCOIN_FAILURE,
    payload,
  });




  export const loadFavCoinRequest = (payload) => ({
    type: types.LOAD_FAVCOIN_REQUEST,
    payload,
  });
  export const loadFavCoinSuccess = (payload) => ({
    type: types.LOAD_FAVCOIN_SUCCESS,
    payload,
  });
  export const loadFavCoinFailure = (payload) => ({
    type: types.LOAD_FAVCOIN_FAILURE,
    payload,
  });


  export const searchCoinRequest = (payload) => ({
    type: types.SEARCH_COIN_REQUEST,
    payload,
  });
  export const searchCoinSuccess = (payload) => ({
    type: types.SEARCH_COIN_SUCCESS,
    payload,
  });
  export const searchCoinFailure = (payload) => ({
    type: types.SEARCH_COIN_FAILURE,
    payload,
  });

  
  export const setSearchName = (payload) => ({
    type: types.SET_SEARCH_NAME,
    payload,
  });