import React from 'react';
import { Text, View, Platform } from 'react-native';

const styles = {
    appFont: {
        fontFamily: 'Helvetica',
        color: '#414141'
    },
    textBold: {
        fontWeight: 'bold'
    }
};

export const B = (props) => (
    <Text style={[styles.textBold, { fontSize: props.fontSize }, styles.appFont]}>
        {props.children}
    </Text>
);

export const Content = (props) => (
    <View style={{ paddingTop: props.padding, paddingBottom: props.padding }}>
        <View style={{ paddingBottom: props.title ? 5 : 0 }}>
            <B fontSize={18}>{props.title}</B>
        </View>
        <Text style={[styles.appFont, { fontSize: 15 }]}>{props.children}</Text>
    </View>
);

export const MainStyles = {
    containerStyle: {
        backgroundColor: 'white',
        flex: 1
    },
    headerStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 25,
        paddingBottom: 15,
        fontFamily: 'Helvetica'
    }
};

export const DetailStyles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
    containerImg: {
        height: 360,
        width: 360
    },
    containerDetail: {
        flex: 1,
        paddingTop: 20
    },
    scrollView: {
        marginTop: Platform.OS === 'ios' ? 0 : 60
    }
};

