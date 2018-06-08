import storage from 'redux-persist/lib/storage';
import { persistReducer, REHYDRATE } from 'redux-persist';

import {
    BEERS_REQUESTED,
    BEERS_SUCCESS,
    BEERS_FAIL,
    BEER_UPDATE_FAV
} from './BeersType';

const INITIAL_STATE = {
    fetching: false,
    beers: null,
    error: null
};

const compareAndUpdateIsFav = (oldList, newList) => {
    //convert Object to Array before process.
    //Check if persist is not exists
    let oldlist = [];
    const newlist = Object.values(newList);

    try {
        oldlist = Object.values(oldList);
    } catch (err) {
        oldlist = newlist;
    }

    //combine 2 array and update isFav
    let updatelist = [];
    oldlist.forEach((oldItem) => {
        newlist.forEach((newItem) => {
            if (newItem.id === oldItem.id) {
                const item = newItem;
                item.isFav = oldItem.isFav;
                updatelist.push(item);
            } else {
                //if server return new item, then push to return array.
                updatelist.push(newItem);
            }
        });
    });

    //init and convert array to object then return
    updatelist = updatelist.reduce((result, item) => {
        const key = item.id;
        const object = result;
        object[key] = item;
        return object;
    }, {});
    return updatelist;
};

const BeersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REHYDRATE:
            return {
                ...state,
                beers: state.beers
            };
        case BEERS_REQUESTED:
            return {
                ...state,
                fetching: true,
                error: null
            };
        case BEERS_SUCCESS:
            return {
                ...state,
                fetching: false,
                beers: compareAndUpdateIsFav(state.beers, action.payload.beers)
            };
        case BEER_UPDATE_FAV:
            return {
                ...state,
                error: null,
                beers: {
                    ...state.beers,
                    [action.payload]: {
                        ...state.beers[action.payload],
                        isFav: !state.beers[action.payload].isFav
                    }
                }
            };
        case BEERS_FAIL:
            return {
                ...state,
                fetching: false,
                beers: null,
                error: action.payload
            };
        default:
            return state;
    }
};

const persistConfig = {
    key: 'data',
    storage,
    blacklist: ['fetching', 'error']
};

export default persistReducer(persistConfig, BeersReducer);
