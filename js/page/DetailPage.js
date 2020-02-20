
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default class DetailPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{'详情页'}</Text>
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
