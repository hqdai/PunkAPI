import { Navigation } from 'react-native-navigation';
import { getImageSource } from 'react-native-vector-icons/Ionicons';
import {
    MAIN_HOME,
    MAIN_CATALOGUE,
    MAIN_WISHLIST,
    TITLE_CATALOGUE,
    TITLE_HOME,
    TITLE_WISHLIST
} from './ScreenConst';

function applyTabBase() {
    Promise.all([
        getImageSource('ios-home', 36),
        getImageSource('ios-star', 36),
        getImageSource('ios-heart', 36)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: MAIN_HOME,
                    title: TITLE_HOME,
                    label: TITLE_HOME,
                    icon: sources[0],
                    //selectedIcon: <Icon name="ios-person" size={30} color="#4F8EF7" />,
                    iconInsets: { // add this to change icon position (optional, iOS only).
                        top: 2, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -2, // optional, default is 0.
                        right: 0 // optional, default is 0.
                    },
                    navigatorStyle: {
                        navBarHidden: true
                    }
                },
                {
                    screen: MAIN_CATALOGUE,
                    title: TITLE_CATALOGUE,
                    label: TITLE_CATALOGUE,
                    icon: sources[1],
                    //selectedIcon: require('../img/ic_cat_selected.png'),
                    iconInsets: { // add this to change icon position (optional, iOS only).
                        top: 2, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -2, // optional, default is 0.
                        right: 0 // optional, default is 0.
                    },
                    navigatorStyle: {
                        navBarHidden: true
                    }
                },
                {
                    screen: MAIN_WISHLIST,
                    title: TITLE_WISHLIST,
                    label: TITLE_WISHLIST,
                    icon: sources[2],
                    //selectedIcon: require('../img/ic_fav_selected.png'),
                    iconInsets: { // add this to change icon position (optional, iOS only).
                        top: 2, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -2, // optional, default is 0.
                        right: 0 // optional, default is 0.
                    },
                    navigatorStyle: {
                        navBarHidden: true
                    }
                }
            ]
        });
    });
}

export { applyTabBase };
