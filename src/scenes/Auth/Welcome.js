import React, { Component } from 'react';
import { Text, View, Image, ImageBackground } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Button } from '../../components';
import { AUTH_LOGIN, MAIN_HOME } from '../../navigation';
import { AuthStyle, BUTTON_EMAIL_COLOR, BUTTON_FACEBOOK_COLOR } from '../../themes';
import { IMAGES_PATH } from '../../themes/Images';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = { facebook: null };

        //this.onLoginFinished = this.onLoginFinished.bind(this);
        this.onEmailPress = this.onEmailPress.bind(this);
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    }

    onEmailPress = () => {
        this.props.navigator.push({
            screen: AUTH_LOGIN,
            navigatorStyle: {
                navBarHidden: true
            }
        });
    }

    // onLoginFinished = (error, result) => {
    //     if (error) {
    //         alert("login has error: " + error.message);
    //         console.log(error);
    //     } else if (result.isCancelled) {
    //         alert("login is cancelled.");
    //     } else {
    //         AccessToken.getCurrentAccessToken().then(
    //         (data) => {
    //             this.setState({facebook: data.accessToken.toString()});
    //             this.props.navigator.resetTo({
    //                 screen: MAIN_HOME,
    //                 navigatorStyle: {
    //                     navBarHidden: true
    //                 }
    //             });
    //         }).catch((err) => {
    //             this.setState({ facebook: null});
    //         });
    //     }
    // }

    // move = () => {
    //     this.props.navigator.resetTo({
    //         screen: MAIN_HOME,
    //         navigatorStyle: {
    //             navBarHidden: true
    //         }
    //     });
    // }

    handleFacebookLogin = () => {
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            (result) => {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    console.log(`Login success with permissions: '
                    + ${result.grantedPermissions.toString()}`);
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            this.setState({ facebook: data.accessToken.toString() });
                            this.props.navigator.resetTo({
                                screen: MAIN_HOME,
                                navigatorStyle: {
                                    navBarHidden: true
                                }
                            });
                        }).catch(() => {
                            this.setState({ facebook: null });
                        });
                }
          },
          (error) => {
                console.log(`Login fail with error: + ${error}`);
          }
        );
        // LoginManager.logInWithReadPermissions(['public_profile']).then(
        //     result => {
        //         console.log(result);
        //     },
        //     error => {
        //         console.log(error);
        //     });
      }

    render() {
        const {
            welcomeTextStyle,
            subWelcomeTextStyle,
            welcomeContainerStyle,
            imgBackgroundStyle,
            textWhiteStyle,
            logoStyle,
            buttonContainer,
            logoContainerStyle,
            welcomeContainerTextStyle
        } = AuthStyle;
        const { authBackground, reactLogo } = IMAGES_PATH;
        return (
            <ImageBackground source={authBackground} style={imgBackgroundStyle}>
                <View style={welcomeContainerStyle}>
                    <View style={logoContainerStyle}>
                        <Image source={reactLogo} style={logoStyle} />
                    </View>
                    <View style={welcomeContainerTextStyle}>
                        <Text style={[welcomeTextStyle, textWhiteStyle]}>
                            Welcome to React Native
                        </Text>
                        <Text style={[subWelcomeTextStyle, textWhiteStyle]}>
                            Learn once, write anywhere.
                        </Text>
                    </View>
                    <View style={buttonContainer}>
                        <Text style={[subWelcomeTextStyle, textWhiteStyle]}>
                            CONTINUE WITH
                        </Text>
                        <Button
                            bgColor={BUTTON_EMAIL_COLOR}
                            onPress={this.onEmailPress}
                        >EMAIL
                        </Button>
                        <Button
                            bgColor={BUTTON_FACEBOOK_COLOR}
                            onPress={this.handleFacebookLogin}
                        >FACEBOOK
                        </Button>
                            {/* <LoginButton
                                publishPermissions={["publish_actions"]}
                                onLoginFinished={this.onLoginFinished}
                                onLogoutFinished={() => alert("logout.")}
                                Text="FACEBOOK"
                                /> */}
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

export default Welcome;
