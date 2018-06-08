import { Navigation } from 'react-native-navigation';
import { AUTH_WELCOME } from './ScreenConst';

function applyInitScreen() {
    Navigation.startSingleScreenApp({
        screen: {
            screen: AUTH_WELCOME, // unique ID registered with Navigation.registerScreen
            navigatorStyle: {
                navBarHidden: true
            }
        }
    });
}

export { applyInitScreen };
