import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { inputStyles } from './styles';

function Input({ children, secureTextEntry, value, onChangeText }) {
    const {
        titleStyle,
        whiteText,
        textInputStyle
    } = inputStyles;
    return (
        <View>
            <Text style={[titleStyle, whiteText]}>{children}</Text>
            <TextInput
                style={textInputStyle}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

export default Input;
