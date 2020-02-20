
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil'

export default class WelcomePage extends React.Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        this.timer = setTimeout(
            ()=>{
               //这个里面是跳转到首页
                NavigationUtil.resetToHomePage(this.props)
            },2000
        )
    }

    componentWillMount(){
        //页面结束时 销毁计时器
        this.timer&&clearTimeout(this.timer)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{'欢迎来到欢迎页'}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#996644',
        justifyContent:'center',
        alignItems:'center'
    },
    text: {
        fontSize: 20,
        color:'#ff00ff'

    },


});
