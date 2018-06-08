import React, { PureComponent } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View, Text } from 'react-native';
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Ionicons';

import { beerItemViewStyles } from './styles';

class BeerItemView extends PureComponent {
    render() {
        const {
            onItemPress,
            onHeartPress,
            image_url,
            name,
            heartColor,
            size
        } = this.props;
        const {
            titleSmallStyle,
            containerStyle,
            imageBg,
            imgContainer,
            img,
            titleStyle,
            containerSmallStyle,
            imgSmallContainer,
            imageSmallBg
        } = beerItemViewStyles;
        return (
            <TouchableOpacity onPress={onItemPress}>
                <View style={(size === 'small') ? containerSmallStyle : containerStyle}>
                    <View style={(size === 'small') ? imageSmallBg : imageBg}>
                        <View style={(size === 'small') ? imgSmallContainer : imgContainer}>
                            <Image
                                resizeMode="contain"
                                source={{ uri: image_url }}
                                style={img}
                            />
                        </View>
                        <TouchableWithoutFeedback onPress={onHeartPress}>
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 3,
                                    right: 3,
                                    height: (size === 'small') ? 14 : 20,
                                    width: (size === 'small') ? 14 : 20 }}
                            >
                                <Icon
                                    name="ios-heart"
                                    size={(size === 'small') ? 14 : 20}
                                    color={heartColor}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <Text style={(size === 'small') ? titleSmallStyle : titleStyle}>
                            {name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default BeerItemView;
