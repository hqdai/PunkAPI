import React, { Component } from 'react';
import { Text, View, ImageBackground, ScrollView } from 'react-native';
import firebase from 'firebase';

import { Button, Input, AppHeader } from '../../components';
import { applyTabBase, MAIN_HOME } from '../../navigation';
import { validateEmail, checkPassword } from '../../configs';
import { IMAGES_PATH } from '../../assets/images';
import { AuthLoginStyles, AuthStyle } from './styles';
import {
    INVALID_EMAIL,
    ERROR_PASSWORD,
    CONFIRM_PASSWORD_MISMATCH,
    AUTHENTICATION_FAIL
} from '../../constants/Message';

import { BUTTON_REGISTER_COLOR } from '../../themes';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            confirmPassword: '',
            confirmPasswordError: ''
        };
    }

    onSignIn = () => {
        this.props.navigator.pop();
    }

    onEmailChange = (text) => {
        if (!validateEmail(text)) {
            this.setState({ emailError: INVALID_EMAIL });
        } else {
            this.setState({ emailError: '' });
        }
        this.setState({ email: text });
    };

    onPasswordChange = (text) => {
        if (!checkPassword(text)) {
            this.setState({ passwordError: ERROR_PASSWORD });
        } else this.setState({ passwordError: '' });
        this.setState({ password: text });
    };

    onConfirmPasswordChange = (text) => {
        if (this.state.password !== text) {
            this.setState({ confirmPasswordError: CONFIRM_PASSWORD_MISMATCH });
        } else this.setState({ confirmPasswordError: '' });
        this.setState({ confirmPassword: text });
    };

    onLoginFail() {
        this.setState({
            loading: false,
            error: AUTHENTICATION_FAIL
        });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
        applyTabBase();
        this.props.navigator.push({
            screen: MAIN_HOME,
            navigatorStyle: {
                navBarHidden: true
            }
        });
    }

    onSignUpPress = () => {
        this.setState({ error: '', loading: true });
        //No issue - Check value from email & password
        if (this.state.emailError === '' &&
            this.state.passwordError === '' &&
            this.state.confirmPasswordError === '') {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
        }
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
                            <Input>Full Name</Input>
                            <Input
                                onChangeText={this.onEmailChange}
                                value={this.state.email}
                            >Email</Input>
                            <Text style={errorText}>{this.state.emailError}</Text>
                            <Input
                                secureTextEntry
                                onChangeText={this.onPasswordChange}
                                value={this.state.password}
                            >Password</Input>
                            <Text style={errorText}>{this.state.passwordError}</Text>
                            <Input
                                secureTextEntry
                                onChangeText={this.onConfirmPasswordChange}
                                value={this.state.confirmPassword}
                            >Confirm Password</Input>
                            <Text style={errorText}>{this.state.confirmPasswordError}</Text>
                            <View style={{ marginTop: 30 }}>
                                <Button
                                    bgColor={BUTTON_REGISTER_COLOR}
                                    onPress={this.onSignUpPress}
                                >SIGN UP</Button>
                            </View>
                        </View>
                        <View style={FooterStyle}>
                            <Text style={FooterTextStyle}>Already have an account?</Text>
                            <Button onPress={this.onSignIn}>SIGN IN</Button>
                        </View>
                    </View>
                    </ScrollView>
            </ImageBackground>
        );
    }
}

export default Register;

