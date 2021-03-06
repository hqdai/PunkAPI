import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { BeerLists } from '../../components/Beers';
import BeerItemContainer from '../../components/Beers/BeerItemContainer';
import { Button } from '../../components';

import { MainStyles } from './styles';
import { AuthStyle } from '../Auth/styles';
import { BUTTON_LOADMORE_COLOR } from '../../themes';

class Catalogue extends Component {
//     constructor(props){
//         super(props);
//         this.state = {numcol: Platform.isPortrait() ? 3:5}
//         // Event Listener for orientation changes
//         Dimensions.addEventListener('change', () => {
//             this.setState({
//                 numcol: Platform.isPortrait() ? 3 : 5
//             });
//         });
//     }
    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
       this.createDataSource(nextProps);
    }

    createDataSource({ beers }) {
       if (beers != null) {
           this.dataSource = Object.values(beers);
       }
    }

    renderItem = ({ item }) => (
        <BeerItemContainer beer={item} navigator={this.props.navigator} size="small" />
    )

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
                    title="Catalogue"
                    numColumns={3}
                />                
            </View>
       );
   }
}

const mapStateToProps = state => (
    { beers: state.data.beers }
);

export default connect(mapStateToProps, null)(Catalogue);
