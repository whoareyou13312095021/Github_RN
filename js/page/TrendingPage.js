
import React, {Component} from 'react';
import { StyleSheet, Text, View,Button} from 'react-native';
import {connect} from 'react-redux'
import {onThemeChange} from "../action/theme";
import actions from '../action'
//如果使用 redux 下面的export default 要注释掉
class TrendingPage extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        const {navigation}=this.props
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{'TrendingPage'}</Text>
                <Button title={'修改下面的主题'}
                        onPress={
                            ()=>this.props.onThemeChange('black')
                    // ()=>navigation.setParams(
                    //     {
                    //         theme:{
                    //             tintColor: 'red',
                    //             updateTime: new Date().getTime(),
                    //         },
                    //     }
                    //
                    // )
                }/>
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

const mapDispatchToProps = dispatch=>({//这一块的问题是因为dispatch 需要有（） 我给忘写了
    onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
})
export default connect(null,mapDispatchToProps)(TrendingPage)
