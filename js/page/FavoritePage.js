
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default class FavoritePage extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{'FavoritePage'}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#447733',
        justifyContent:'center',
        alignItems:'center'
    },
    text: {
        fontSize: 20,
        color:'#ff70ff'

    },


});
