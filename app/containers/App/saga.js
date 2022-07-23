import {
    call,
    takeEvery,
    takeLatest,
    select,
    put,
    takeLeading,
    delay,
  } from 'redux-saga/effects';
  import Api from '../../utils/Api';
  import * as types from './constants';
  import * as actions from './actions';






  function* loadAllCoin(action) {
    yield call(
      Api.thirdPartyGet(
        "https://api.coincap.io/v2/assets",
        actions.loadAllCoinSuccess,
        actions.loadAllCoinFailure,
      ),
    );
  }

  function* loadFavCoin(action) {
    yield call(
      Api.thirdPartyGet(
        "https://api.coincap.io/v2/assets/bitcoin",
        actions.loadFavCoinSuccess,
        actions.loadFavCoinFailure,
      ),
    );
  }


  function* searchCoin(action) {
    const uri = `https://api.coincap.io/v2/assets/${action.payload}/history?interval=d1`;
    yield call(
      Api.thirdPartyGet(
        uri,
        actions.searchCoinSuccess,
        actions.searchCoinFailure,
      ),
    );
    yield put(actions.setSearchName(action.payload))


  }



function* networkError() {
    const snackbarData = {
      message: 'Something went wrong. Please check your network!',
      options: {
        variant: 'warning',
      },
    };
    yield put(actions.enqueueSnackbar(snackbarData));
    yield delay(2000);
  }



  export default function* defaultSaga() {
    yield takeEvery(types.LOAD_ALLCOIN_REQUEST, loadAllCoin);
    yield takeEvery(types.LOAD_FAVCOIN_REQUEST, loadFavCoin);
    yield takeEvery(types.SEARCH_COIN_REQUEST, searchCoin);

    yield takeLeading(types.NETWORK_ERROR, networkError);
  }