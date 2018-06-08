import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { BeerLists } from '../../components/Beers';
import BeerItemContainer from '../../components/Beers/BeerItemContainer';
import { MainStyles } from './styles';

class WishList extends Component {
     componentWillMount() {
         this.createDataSource(this.props);
     }

    componentWillReceiveProps(nextProps) {
        //compare old props.item with nextprops.item
        this.createDataSource(nextProps);
    }

    createDataSource({ beers }) {
        if (beers != null) {
            this.dataSource = Object.values(beers).filter(beer => beer.isFav);
        }
    }

    renderItem = ({ item }) => (
        <BeerItemContainer beer={item} navigator={this.props.navigator} />
    );

    render() {
        const {
            containerStyle
        } = MainStyles;
        return (
            <View style={[containerStyle, { alignItems: 'center' }]}>
                <BeerLists
                    data={this.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={item => (item.id + item.name)}
                    title="Your Wish List"
                    numColumns={2}
                    titleCenter
                />
            </View>
        );
    }
}

const mapStateToProps = state => (
    { beers: state.data.beers }
);

export default connect(mapStateToProps, null)(WishList);
