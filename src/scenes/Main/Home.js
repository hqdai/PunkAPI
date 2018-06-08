import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { Spinner } from '../../components';
import { getBeers } from '../../ducks/Beers/BeersActions';
import { BeerLists } from '../../components/Beers';
import BeerItemContainer from '../../components/Beers/BeerItemContainer';
import { MainStyles } from './styles';

class Home extends Component {
    componentWillMount() {
        this.props.getBeers();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ beers }) {
        if (beers != null) {
            //convert Object list to Array for FlatList
            this.dataSource = Object.values(beers)
            .filter(beer => beer.typeof.includes('today'));

            this.dataSourceFirstBrewed = Object.values(beers)
            .filter(beer => beer.typeof.includes('first'));
        }
    }

    renderItem = ({ item }) => (
        <BeerItemContainer beer={item} navigator={this.props.navigator} />
    );

    renderHome = () => {
        if (this.props.fetching) {
            return <Spinner size="large" />;
        }
        const {
            containerStyle
        } = MainStyles;
        return (
            <ScrollView>
                <View style={[containerStyle, { paddingLeft: 10 }]}>
                    <BeerLists
                        data={this.dataSource}
                        renderItem={this.renderItem}
                        keyExtractor={item => (item.id + item.name)}
                        horizontal
                        title="Today"
                    />
                    <BeerLists
                        data={this.dataSourceFirstBrewed}
                        renderItem={this.renderItem}
                        keyExtractor={item => (item.id + item.name)}
                        horizontal
                        title="First Brewed"
                    />
                </View>
            </ScrollView>
        );
    }

    render() {
        return this.renderHome();
    }
}

const mapStateToProps = state => ({
    fetching: state.data.fetching,
    beers: state.data.beers,
    error: state.data.error
});

export default connect(mapStateToProps, { getBeers })(Home);
