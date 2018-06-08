import React from 'react';
import { View, Text, Image } from 'react-native';

import { IMAGES_PATH } from '../../assets/images';
import { styles } from './styles';

function AppHeader() {
    const {
        headerContainer,
        logoStyle,
        textMainStyle,
        whiteTextStyle,
        textSubStyle
    } = styles;
    return (
        <View style={headerContainer}>
            <Image
                style={logoStyle}
                source={IMAGES_PATH.reactLogo}
            />
            <View>
                <Text style={[textMainStyle, whiteTextStyle]}>React Native</Text>
                <Text style={[textSubStyle, whiteTextStyle]}>Learn once, write anywhere</Text>
            </View>
        </View>
    );
}

export default AppHeader;
