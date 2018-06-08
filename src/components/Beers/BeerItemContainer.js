import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { beerUpdateFav } from '../../ducks/Beers/BeersActions';
import { MAIN_DETAIL } from '../../navigation';
import { HEART_ICON_COLOR, HEART_ICON_COLOR_SELECTED } from '../../themes';

import BeerItemView from './BeerItemView';

class BeerItemContainer extends PureComponent {
    onItemPress = () => {
        this.props.navigator.push({
            screen: MAIN_DETAIL,
            passProps: { beer: this.props.beer },
            title: this.props.beer.name,
            subtitle: this.props.beer.tagline,
            backButtonTitle: '',
            navigatorStyle: {
                tabBarHidden: true,
                drawUnderNavBar: false,
                navBarTransparent: true,
                navBarSubtitleFontSize: 16,
                navBarSubtitleColor: '#8E8E93',
                navBarSubtitleFontFamily: 'Helvetica',
                navBarTextColor: '#000000',
                navBarTextFontSize: 18,
                navBarTextFontFamily: 'Helvetica'
            }
        });
    }

    onHeartPress =() => {
        this.props.beerUpdateFav(this.props.beer.id);
    }

    renderIconWishList = (isFav) => {
        if (!isFav) {
            return HEART_ICON_COLOR;
        }
        return HEART_ICON_COLOR_SELECTED;
    }

    render() {
        const { name, image_url, isFav } = this.props.beer;
        return (
            <BeerItemView
                onItemPress={this.onItemPress}
                onHeartPress={this.onHeartPress}
                image_url={image_url}
                name={name}
                heartColor={this.renderIconWishList(isFav)}
                size={this.props.size}
            />
        );
    }
}

export default connect(null, { beerUpdateFav })(BeerItemContainer);
