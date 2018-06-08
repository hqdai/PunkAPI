import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import Welcome from '../scenes/Auth/Welcome';
import Login from '../scenes/Auth/Login';
import Register from '../scenes/Auth/Register';

import Home from '../scenes/Main/Home';
import Catalogue from '../scenes/Main/Catalogue';
import WishList from '../scenes/Main/WishList';
import Detail from '../scenes/Main/Detail';

import { appStore } from '../appStore';
import {
    AUTH_WELCOME,
    AUTH_LOGIN,
    AUTH_REGISTER,
    MAIN_HOME,
    MAIN_CATALOGUE,
    MAIN_WISHLIST,
    MAIN_DETAIL
} from './ScreenConst';

function registerScreens() {
    //Auth scenes
    Navigation.registerComponent(AUTH_WELCOME, () => Welcome);
    Navigation.registerComponent(AUTH_LOGIN, () => Login, appStore, Provider);
    Navigation.registerComponent(AUTH_REGISTER, () => Register);

    //Main scenes
    Navigation.registerComponent(MAIN_HOME, () => Home, appStore, Provider);
    Navigation.registerComponent(MAIN_CATALOGUE, () => Catalogue, appStore, Provider);
    Navigation.registerComponent(MAIN_WISHLIST, () => WishList, appStore, Provider);
    Navigation.registerComponent(MAIN_DETAIL, () => Detail, appStore, Provider);
}

export default registerScreens;
