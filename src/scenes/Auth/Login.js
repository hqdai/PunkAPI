import React, { Component } from 'react';
import { Text, View, ImageBackground, ScrollView } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';

import { Button, Input, Spinner, AppHeader } from '../../components';

import { LoginUser } from '../../ducks/Auth/AuthActions';
import { validateEmail, checkPassword, FirebaseConfig } from '../../configs';

import { applyTabBase, AUTH_REGISTER, MAIN_HOME } from '../../navigation';
import { INVALID_EMAIL, ERROR_PASSWORD } from '../../constants/Message';
import { IMAGES_PATH } from '../../themes/Images';
import { BUTTON_LOGIN_COLOR, AuthLoginStyles, AuthStyle } from '../../themes';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: ''
        };
    }

    componentWillMount() {
        firebase.initializeApp(FirebaseConfig);
        //Check login already
        //To back to login screen, comment these lines
        if (this.props.user != null) {
            this.onLoginSuccess();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user && nextProps.user != null) {
            this.onLoginSuccess();
        } else {
            this.onLoginFail(nextProps.error);
        }
    }

    //Open Register Screen
    onSignUp = () => {
        this.props.navigator.push({
            screen: AUTH_REGISTER,
            navigatorStyle: {
                navBarHidden: true
            }
        });
    }

    onEmailChange = (text) => {
        if (!validateEmail(text)) {
            this.setState(this.setState({ emailError: INVALID_EMAIL }));
        } else this.setState({ emailError: '' });
        this.setState({ email: text });
    };

    onPasswordChange = (text) => {
        if (!checkPassword(text)) {
            this.setState(this.setState({ passwordError: ERROR_PASSWORD }));
        } else this.setState({ passwordError: '' });
        this.setState({ password: text });
    };

    //compare to local state and allow to signin
    onSignIn = () => {
        if (this.state.emailError === '' && this.state.passwordError === '') {
            this.props.LoginUser({ email: this.state.email, password: this.state.password });
        }
    }

    onLoginFail(err) {
        if (err !== null) {
            alert(err);
        }
    }

    onLoginSuccess() {
        applyTabBase();
        this.props.navigator.push({
            screen: MAIN_HOME,
            navigatorStyle: {
                navBarHidden: true
            }
        });
    }

    renderSignButton() {
        if (this.props.loading === true) {
            return <Spinner />;
        }
        return (
            <View style={{ marginTop: 15 }}>
                <Button onPress={this.onSignIn} bgColor={BUTTON_LOGIN_COLOR}>SIGN IN</Button>
            </View>
        );
    }

    render() {
        const {
            loginContainer,
            AppHeaderStyle,
            FormStyle,
            FooterStyle,
            FooterTextStyle,
            errorText
        } = AuthLoginStyles;
        const { imgBackgroundStyle } = AuthStyle;
        return (
            <ImageBackground source={IMAGES_PATH.authBackground} style={imgBackgroundStyle}>
                <ScrollView>
                    <View style={loginContainer}>
                        <View style={AppHeaderStyle}>
                            <AppHeader />
                        </View>
                        <View style={FormStyle}>
                            <Input
                                value={this.state.email}
                                onChangeText={this.onEmailChange}
                            >Email
                            </Input>
                            <Text style={errorText}>{this.state.emailError}</Text>
                            <Input
                                value={this.state.password}
                                secureTextEntry
                                onChangeText={this.onPasswordChange}
                            >Password
                            </Input>
                            <Text style={errorText}>{this.state.passwordError}</Text>
                            {this.renderSignButton()}
                        </View>
                        <View style={FooterStyle}>
                            <Text style={FooterTextStyle}>Need an account?</Text>
                            <Button onPress={this.onSignUp}>SIGN UP</Button>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
        error: state.auth.error,
        user: state.auth.user,
        loading: state.auth.logging
    }
);

export default connect(mapStateToProps, { LoginUser })(Login);
