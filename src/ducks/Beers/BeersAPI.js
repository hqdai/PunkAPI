/* Define functions to get data from Beer API */
import axios from 'axios';
import { API_BEERS_LIST, API_BEERS_FIRST_BREWED } from '../../constants/API';

export const fetchBeers = () => axios({
    method: 'get',
    url: API_BEERS_LIST
});

export const fetchFirstBrewed = () => axios({
    method: 'get',
    url: API_BEERS_FIRST_BREWED
});
