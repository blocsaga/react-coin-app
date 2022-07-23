/*
 * AppReducer
 *
 * The reducer takes care of our data/state. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 */

import produce from 'immer';

import * as types from './constants';

// The initial state of the App 
// Let's begin with only notification handler as of now
export const initialState = {
  notifications: [],
  allCoin:[],
  favCoin:{},
  searchName:'',
  searchCoin:{},
  allCoinLoading:false,
  favCoinLoading:false,
  searchCoinLoading:false,

};

/* eslint-disable default-case */
const appReducer = (state = initialState, action = { type: '' }) =>
  produce(state, (draft) => {
  
    switch (action.type) {
    
        case types.LOAD_FAVCOIN_REQUEST:
            draft.favCoinLoading = true;
            break;
        case types.LOAD_FAVCOIN_SUCCESS:
            draft.favCoin =
            action.payload.data;
            draft.favCoinLoading = false;
            break;
          case types.LOAD_FAVCOIN_FAILURE:
            draft.favCoinLoading = false;
            break;


            case types.SEARCH_COIN_REQUEST:
              draft.searchCoinLoading = true;
              break;
          case types.SEARCH_COIN_SUCCESS:
              draft.searchCoin =
              action.payload.data;
              draft.searchCoinLoading = false;
              break;
            case types.SEARCH_COIN_FAILURE:
              draft.searchCoinLoading = false;
              break;
              
              case types.SET_SEARCH_NAME:
              draft.searchName = action.payload;
              break;

            case types.LOAD_ALLCOIN_REQUEST:
              draft.allCoinLoading = true;
              break;
          case types.LOAD_ALLCOIN_SUCCESS:
              draft.allCoin =
              action.payload.data;
              draft.allCoinLoading = false;
              break;
            case types.LOAD_ALLCOIN_FAILURE:
              draft.allCoinLoading = false;
              break;

            
      case types.ENQUEUE_SNACKBAR:
        draft.notifications = [...draft.notifications, { ...action.payload }];
        break;
      case types.REMOVE_SNACKBAR:
        draft.notifications = [
          ...draft.notifications.filter(
            (notification) => notification.key !== action.payload,
          ),
        ];
        break;

    }
  });

export default appReducer;