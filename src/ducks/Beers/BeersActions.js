import { BEERS_REQUESTED, BEER_UPDATE_FAV } from './BeersType';

export const getBeers = () => ({
    type: BEERS_REQUESTED
});

export const beerUpdateFav = (id) => ({
    type: BEER_UPDATE_FAV,
    payload: id
});
