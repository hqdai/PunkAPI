import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { spinnerStyles } from './styles';

function Spinner({ size }) {
    const { spinnerStyle } = spinnerStyles;
    return (
        <View style={spinnerStyle}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    );
}

export default Spinner;
