//Define all URL API of the app
export const API_BEERS_LIST = 'https://api.punkapi.com/v2/beers?page=1&per_page=20';
export const API_BEERS_FIRST_BREWED = 'https://api.punkapi.com/v2/beers?page=1&per_page=20&brewed_after=10-2015';

export const API_BEERS_PAGING = (page, perPage) => `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`;
