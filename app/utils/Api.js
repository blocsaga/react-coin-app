import { call, put } from 'redux-saga/effects';
import {  networkError } from '../containers/App/actions';
import objectToFormData from './objectToFormData';
import request from './request';

const API_BASE = "http://localhost:3000/api/";

class Api {


  /**
   * Third party data loader 
   */

  // coin-cap api key
  //  bb529850-4177-4a3c-b6c8-213aaee96684
  
  static thirdPartyGet(apiUri, onSuccess, onError, data, token, metaData) {
    return function* commonApiSetup() {
      try {
        const options = {
          method: 'GET',
        };
  
        const response = yield call(request, apiUri, options);
        yield put(onSuccess(response));
      } catch (err) {
        console.log("error is", err);
          yield put(networkError(err));
      }
    };
  }




  /**
   * Generic api data loader
   */
  static dataLoader(apiUri, onSuccess, onError, data, token, metaData) {
    return function* commonApiSetup() {
      const requestURL = `${API_BASE}${apiUri}`;
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        };
        if (data !== undefined) {
          options.method = metaData === 'put' ? 'PUT' : 'POST';
          options.body = JSON.stringify(data);
        }
        const response = yield call(request, requestURL, options);
        yield put(onSuccess(response));
      } catch (err) {
        let error = null;
        try {
          const errorPromise = err.response.json();
          error = yield call(() => errorPromise);
          yield put(networkError(error));

        } catch (e) {
          yield put(networkError(e));
          yield put(onError(e));
        }
      }
    };
  }

  static multipartPost(
    apiUri,
    onSuccess,
    onError,
    data,
    document = {},
    token,
    metaData,
  ) {
    return function* multiPartApiSetup() {
      const requestURL = `${API_BASE}${apiUri}`;
      let multipartData = new FormData();
      multipartData = objectToFormData(data, multipartData);
      Object.keys(document).map((each) => {
        if (Array.isArray(document[each])) {
          document[each].map((fileObj) =>
            multipartData.append([each], fileObj),
          );
        } else {
          multipartData.append([each], document[each]);
        }
        return null;
      });
      try {
        const options = {
          method: metaData === 'put' ? 'PUT' : 'POST',
          body: multipartData,
          headers: {
            Authorization: token,
          },
        };
        const response = yield call(request, requestURL, options);
        yield put(onSuccess(response));
      } catch (err) {
        let error = null;
        try {
          error = yield call(() => err.response.json());
          if (error.errors.name === 'JsonWebTokenError') {
            yield put(sessionExpired(error));
          } else {
            yield put(onError(error));
          }
        } catch (e) {
          yield put(onError(error));
        }
      }
    };
  }

  /*
   * Shorthand GET function
   */
  static get(apiUri, onSuccess, onError, token) {
    return this.dataLoader(apiUri, onSuccess, onError, undefined, token);
  }

  /*
   * Shorthand POST function
   */
  static post(apiUri, onSuccess, onError, data, token) {
    return this.dataLoader(apiUri, onSuccess, onError, data, token);
  }

  /*
   * Shorthand PUT function
   */
  static put(apiUri, onSuccess, onError, data, token, metaData = 'put') {
    return this.dataLoader(apiUri, onSuccess, onError, data, token, metaData);
  }

  /*
   * Shorthand PATCH function
   */
  static patch(apiUri, onSuccess, onError, data, token) {
    return function* patchApiSetup() {
      const requestURL = `${API_BASE}${apiUri}`;
      try {
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(data),
        };
        const response = yield call(request, requestURL, options);
        yield put(onSuccess(response));
      } catch (err) {
        let error = null;
        try {
          error = yield call(() => err.response.json());
          if (error.errors.name === 'JsonWebTokenError') {
            yield put(sessionExpired(error));
          } else {
            yield put(onError(error));
          }
        } catch (e) {
          yield put(networkError(e));
          yield put(onError());
        }
      }
    };
  }

  /*
   * Shorthand DELETE function
   */
  static delete(apiUri, onSuccess, onError, token) {
    return function* deleteApiSetup() {
      const requestURL = `${API_BASE}${apiUri}`;
      try {
        // Call our request helper (see 'utils/request')
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        };
        const response = yield call(request, requestURL, options);
        yield put(onSuccess(response));
      } catch (err) {
        let error = null;
        try {
          error = yield call(() => err.response.json());
          if (error.errors.name === 'JsonWebTokenError') {
            yield put(sessionExpired(error));
          } else {
            yield put(onError(error));
          }
        } catch (e) {
          yield put(networkError(e));
          yield put(onError());
        }
      }
    };
  }
}

export default Api;