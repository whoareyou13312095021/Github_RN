
import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import actions from '../action';
import {connect} from 'react-redux';
import NavigationUtil from '../navigator/NavigationUtil';
class MyPage extends React.Component {

    render() {
        const {navigation}=this.props
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{'MyPage'}</Text>
                <Button title={'修改下面的主题'}
                        onPress={
                            ()=>this.props.onThemeChange('#226678')
                        }/>
                <Text onPress={
                    ()=>{
                        NavigationUtil.goPage({},'DetailPage')
                    }
                }>{'跳转到详情页'}</Text>
                <Button title={'跳转到欢迎网络请求界面'} onPress={
                    ()=>{
                        NavigationUtil.goPage({},'FetchDemo')
                    }
                }></Button>

                <Button title={'跳转到AysncStorage界面'} onPress={
                    ()=>{
                        NavigationUtil.goPage({},'AsyncStorageDemo')
                    }
                }></Button>

                <Button title={'跳转到DataStorageDemo界面'} onPress={
                    ()=>{
                        NavigationUtil.goPage({},'DataStorageDemo')
                    }
                }></Button>
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
export default connect(null,mapDispatchToProps)(MyPage)