/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const NETWORK_ERROR = 'app/App/NETWORK_ERROR';

export const ENQUEUE_SNACKBAR = 'app/App/ENQUEUE_SNACKBAR';
export const REMOVE_SNACKBAR = 'app/App/REMOVE_SNACKBAR';


export const LOAD_ALLCOIN_REQUEST = 'app/App/LOAD_ALLCOIN_REQUEST';
export const LOAD_ALLCOIN_SUCCESS = 'app/App/LOAD_ALLCOIN_SUCCESS';
export const LOAD_ALLCOIN_FAILURE = 'app/App/LOAD_ALLCOIN_FAILURE';

export const LOAD_FAVCOIN_REQUEST = 'app/App/LOAD_FAVCOIN_REQUEST';
export const LOAD_FAVCOIN_SUCCESS = 'app/App/LOAD_FAVCOIN_SUCCESS';
export const LOAD_FAVCOIN_FAILURE = 'app/App/LOAD_FAVCOIN_FAILURE';

export const SEARCH_COIN_REQUEST = 'app/App/SEARCH_COIN_REQUEST';
export const SEARCH_COIN_SUCCESS = 'app/App/SEARCH_COIN_SUCCESS';
export const SEARCH_COIN_FAILURE = 'app/App/SEARCH_COIN_FAILURE';

export const SET_SEARCH_NAME = 'app/App/SET_SEARCH_NAME';
