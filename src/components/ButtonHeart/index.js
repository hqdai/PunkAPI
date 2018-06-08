import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './styles';
import { HEART_ICON_COLOR, HEART_ICON_COLOR_SELECTED } from '../../themes';

class ButtonHeart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { isFav: this.props.isFav };
        this.renderColor = this.renderColor.bind(this);
    }

    onPress = () => {
        this.props.onHeartPress();
        this.setState({ isFav: !this.state.isFav });
    }

    renderColor() {
        return this.state.isFav ? HEART_ICON_COLOR_SELECTED : HEART_ICON_COLOR;
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress} style={styles.iconPlace}>
                <View>
                    <Icon name="ios-heart" size={30} color={this.renderColor()} />
                </View>
            </TouchableOpacity>
        );
    }
}

export default ButtonHeart;
