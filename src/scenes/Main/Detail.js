import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Image from 'react-native-image-progress';
//import Image from 'react-native-scalable-image';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';

import { ButtonHeart } from '../../components';
import { beerUpdateFav } from '../../ducks/Beers/BeersActions';

import { B, Content, DetailStyles } from './styles';

class Detail extends Component {
    componentDidMount() {
        this.props.navigator.setButtons({
            rightButtons: [
                this.renderRightButton()
            ]
        });
    }

    renderRightButton = () => {
        Navigation.registerComponent('ButtonHeart', () => ButtonHeart);
        return ({
            component: 'ButtonHeart',
            id: 'addToWishList',
            passProps: {
                onHeartPress: () => this.props.beerUpdateFav(this.props.beer.id),
                isFav: this.props.beer.isFav
            }
        });
    }

    render() {
        const beer = this.props.beer;
        const { container, containerDetail, containerImg, scrollView } = DetailStyles;
        return (
            <ScrollView style={scrollView}>
                <View style={[container]}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={containerImg}>
                            <Image 
                                resizeMode="contain"
                                source={{ uri: beer.image_url }} 
                                style={{position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0}}
                            />
                        </View>
                    </View>
                    <View style={containerDetail}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: 220
                            }}
                        >
                            <Text><B>IBU: </B>{beer.ibu}</Text>
                            <Text><B>ABV: </B>{beer.abv}%</Text>
                            <Text><B>EBC: </B>{beer.ebc}</Text>
                        </View>
                        <Content>
                            {beer.description}
                        </Content>
                        <Content
                            title="Best served with: "
                            padding={10}
                        >
                            {beer.food_pairing}
                        </Content>
                        <Content title="Tips: " padding={10}>
                            {beer.brewers_tips}
                        </Content>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default connect(null, { beerUpdateFav })(Detail);

