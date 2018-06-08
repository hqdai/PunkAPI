import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { MainStyles } from './styles';

function BeerList(props) {
    const { data, renderItem, keyExtractor, horizontal, numColumns, title, titleCenter } = props;
    return (
        <View>
            <Text
                style={[
                    MainStyles.headerStyle,
                    titleCenter && { textAlign: 'center' }
                ]}
            >
                {title}
            </Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal={horizontal}
                numColumns={numColumns}
                key={numColumns}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

export default BeerList;
