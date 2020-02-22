import PopularPage from "../page/PopularPage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TrendingPage from "../page/TrendingPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import FavoritePage from "../page/FavoritePage";
import MyPage from "../page/MyPage";
import Entypo from "react-native-vector-icons/Entypo";
import React from "react";
import {createAppContainer} from 'react-navigation';
import  {createBottomTabNavigator,BottomTabBar} from  'react-navigation-tabs'
import {connect} from 'react-redux'
import {DeviceInfo} from 'react-native'//判断机型

const TAB = {
    //在这里配置路由
    PopularPage:{
        screen:PopularPage,
        navigationOptions:{
            tabBarLabel:'最热',
            tabBarIcon:({tintColor,focused})=>(
                <MaterialIcons
                    name={'whatshot'}
                    size={26}//闪退的原因 我给写成了 size={'26'}
                    style={{color:tintColor}}
                />
            )
        }
    },
    TrendingPage:{
        screen:TrendingPage,
        navigationOptions:{
            tabBarLabel:'趋势',
            tabBarIcon:({tintColor,focused})=>(
                <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{color:tintColor}}
                />
            )

        }
    },
    FavoritePage:{
        screen:FavoritePage,
        navigationOptions:{
            tabBarLabel:'收藏',
            tabBarIcon:({tintColor,focused})=>(
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color:tintColor}}
                />
            )

        }
    },
    MyPage:{
        screen:MyPage,
        navigationOptions:{
            tabBarLabel:'我的',
            tabBarIcon:({tintColor,focused})=>(
                <Entypo
                    name={'user'}
                    size={26}
                    style={{color:tintColor}}
                />
            )

        }
    }
};

class DynamicTabnavigator extends React.Component{
    constructor(props){
        super(props)
        console.disableYellowBox =true //关闭黄色警告弹框
    }
    _tabNavigator(){
        if(this.Tabs){
            return this.Tabs
        }
        const {PopularPage,TrendingPage,FavoritePage,MyPage} = TAB ; //从TAB里面取出相对应的路由 解构ES6
        const tabs = {PopularPage,TrendingPage,FavoritePage,MyPage};
        PopularPage.navigationOptions.tabBarLabel = '最热'//动态修改tab的属性
        return this.Tabs=createAppContainer(createBottomTabNavigator(
                tabs,   //这里面先前我给写成{ tabs } 导致获取不到 tabs  报错信息 找不到tabs
            {
               tabBarComponent:props=>{
                   return <TabBarComponent theme={this.props.theme}  {...props}/>
               }
            }
        ))
    }

    render(){
        //在这块有点问题   如果直接写成 return this.tabNavigator() 显示不出来  需要用到jsx的语法  先获得以下 再return
        const Tab = this._tabNavigator()
        return <Tab/>
    }

}
class TabBarComponent extends React.Component{
    render(){
        return(
            <BottomTabBar
                {...this.props}
                activeTintColor={
                    this.props.theme
                }
            /> //重新bottomTabbar

        )
    }

}

const  mapStateToProps=state=>({
    theme:state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabnavigator)