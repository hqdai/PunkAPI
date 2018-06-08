import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { buttonStyles } from './styles';

function Button({ onPress, children, bgColor }) {
    const { button, buttonTextStyle } = buttonStyles;
    return (
        <TouchableOpacity
            style={[button, { backgroundColor: bgColor }]}
            onPress={onPress}
        >
            <Text style={buttonTextStyle}>{children}</Text>
        </TouchableOpacity>
    );
}

export default Button;
