
import React, {Component} from 'react';
import {Button, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import actions from '../action';
import {connect} from 'react-redux';
import NavigationUtil from '../navigator/NavigationUtil';
import NavigationBar from '../common/NavigationBar'
const THEME_COLOR = '#226677'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'
class MyPage extends React.Component {

    getRightButton(){
        return <View style={{flexDirection:'row'}}>
            <TouchableOpacity
            onPress={()=>{

            }}
            >
            <View style={{padding:5,marginRight:8}}>
                <Feather
                name={'search'}
                size={24}
                style={{color: '#994422'}}
                />
            </View>
            </TouchableOpacity>


        </View>
    }

    getLeftButton(callback){
        return <TouchableOpacity
                onPress={callback}
            >
                <View style={{padding: 5,marginLeft:8}}>
                    <Ionicons
                        name={'ios-arrow-back'}
                        size={24}
                        style={{color: '#994422'}}
                    />
                </View>
            </TouchableOpacity>
    }

    render() {
        let statusBar = {
            backgroundColor:'#ff00ff',
            barStyle:'light-content'
        }
        let navigationBar =
            <NavigationBar
            title={'我的'}
            statusBar={statusBar}
            style={{backgroundColor:THEME_COLOR}}
            rightButton={this.getRightButton()}
            leftButton={this.getLeftButton()}

        />
        const {navigation}=this.props
        return (
            <View style={styles.container}>
                {navigationBar}
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
        // backgroundColor:'#447733',
        // justifyContent:'center',
        // alignItems:'center'
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