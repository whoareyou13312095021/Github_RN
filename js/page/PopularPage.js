
import React, {Component} from 'react';
import { StyleSheet, Text, View,Button,FlatList,RefreshControl,ActivityIndicator} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'//createTabNavigator
import {createAppContainer} from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil';
import {connect} from 'react-redux'
import actions from '../action/index'
import PopularItem from '../common/PopularItem'
import Toast from 'react-native-easy-toast'
import {onRefreshPopular} from "../action/popular";
const URL =`https://api.github.com/search/repositories?q=`;
const QUERY_STR = `&sort=stars`;
const THEME_COLOR='red';

export default class PopularPage extends React.Component {
    constructor(props){
        super(props)
        this.tabNames=['java','android','ios','php','vue','react']
    }
    //动态生成tab
    _genTabs(){
        const tans={};
        this.tabNames.forEach((item,index)=>{
            tans[`tab${index}`] ={//`tab&{index 设置唯一的路由名字  //在这块出了问题  const tans={};定义的tans   tans[`tab${index}`] 这一块写成了 tabs[`tab${index}`] 报错信息找不到tabs 低级错误
                    screen:props=><PopularTabPage {...props} tabLabel={item}/>,//这个是动态设置属性 我们一般是直接跳转某个界面
                   navigationOptions:{
                        title:item,
                   }
            }
        });
        return tans
    }
    render() {
        const TabNavigator=createAppContainer(
            createMaterialTopTabNavigator(
                this._genTabs(),
                //设置样式
                {
                    tabBarOptions:{
                        tabStyle:styles.tabStyle,
                        upperCaseLabel:false,
                        scrollEnabled:true,
                        style:{
                            backgroundColor:'#234571'
                        },
                        indicatorStyle:styles.indicatorStyle,
                        labelStyle:styles.labelStyle,
                    }
                }

            )
        );
        return (
            <View style={styles.container}>
                <TabNavigator/>
            </View>
        );
    }
}
const  pageSize = 10;//设置常量 防止修改
class PopularTab extends Component{
    constructor(props){
        super(props)
        const {tabLabel}=this.props;
        this.storeName=tabLabel;
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(loadMore){
        const  {onRefreshPopular,onLoadMorePopular}=this.props;
        const store=this._store();
        const url = this.getFetchUrl(this.storeName);
        if (loadMore){
            onLoadMorePopular(this.storeName,++store.pageIndex,pageSize , store.items,callback=>{
                this.refs.toast.show('没有更多了啊');
            })
        }else {
            onRefreshPopular(this.storeName,url,pageSize)
        }

    }
    _store(){
        const {popular}=this.props;
        let store =popular[this.storeName];
        if(!store){
            store ={
                items:[],
                isLoading: false,
                projectModes:[],//要显示的数据
                hiddeLoadingMore:true,//默认隐藏加载更多
            }
        }
        return store;
    }
    getFetchUrl(key){
        return URL+key+QUERY_STR;
    }
    renderItem(data){
        const item=data.item;
        return <PopularItem
       item={item}
       onSelect={()=>{
           }
        }/>
    }
    genIndicator(){
        return this._store().hiddeLoadingMore?null:
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                  style={styles.indicator}
                />
                <Text>
                    {'正在加载更多'}
                </Text>
            </View>
    }
        render(){
            const {popular}=this.props;
            let store = this._store();
            return(
                <View style={styles.containerTab}>
                    <FlatList data={store.projectModes}
                              renderItem={data=>this.renderItem(data)}
                              keyExtractor={item=>''+item.id}
                              refreshControl={
                                  <RefreshControl
                                      title={'loading'}
                                      titleColor={THEME_COLOR}
                                      colors={[THEME_COLOR]}
                                      refreshing={store.isLoading}
                                      onRefresh={()=>this.loadData()}
                                      tintColor={THEME_COLOR}
                                  />
                              }
                              ListFooterComponent={()=>this.genIndicator()}
                              onEndReached={
                                  ()=>this.loadData(true)
                              }
                              onEndReachedThreshold={0.5}
                    />
                    <Toast ref={'toast'}
                    position={'center'}/>
                </View>)
            }
        }
const mapStateToPrpos=state=>({
    popular:state.populor
})
const mapDispatchToPrpos=dispatch=>({
    //将dispatch（onLoadPopular(storeName,url））绑定到props
    onRefreshPopular :(storeName,url,pageSize)=>dispatch(actions.onRefreshPopular(storeName,url,pageSize)),
    onLoadMorePopular:(storeName,pageIndex,pageSize,items,callBack)=>dispatch(actions.onLoadMorePopular(storeName,pageIndex,pageSize,items,callBack))
})
const PopularTabPage =connect(mapStateToPrpos,mapDispatchToPrpos)(PopularTab)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#447733',
        // justifyContent:'center',
        // alignItems:'center'
    },
    containerTab: {
        flex: 1,
        backgroundColor:'#447733',
        // marginTop:50
        // justifyContent:'center',
        // alignItems:'center'
    },
    text: {
        fontSize: 20,
        color:'#ff70ff'

    },
    tabStyle:{
        minWidth:50
    },
    indicatorStyle:{
        height:2,
        backgroundColor:'white'
    },
    labelStyle:{
        fontSize: 13
    },
    indicatorContainer:{
        alignItems:'center'
    },
    indicator:{
        color: 'red',
        margin:10,
    }


});