
import React, {Component} from 'react';
import { StyleSheet, Text, View,Button,FlatList,RefreshControl,ActivityIndicator} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'//createTabNavigator
import {createAppContainer} from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil';
import {connect} from 'react-redux'
import actions from '../action/index'
import TrendingItem from '../common/TrendingItem'
import Toast from 'react-native-easy-toast'
import {onRefreshPopular} from "../action/popular";
const URL =`https://github.com/trending/`;
const QUERY_STR = `&sort=stars`;
const THEME_COLOR='red';
import NavigationBar from '../common/NavigationBar'

export default class TrendingPage extends React.Component {
    constructor(props){
        super(props)
        this.tabNames=['c','c#','php','javascript'] //视频里的all  这个模块 里面没有数据
    }
    //动态生成tab
    _genTabs(){
        const tans={};
        this.tabNames.forEach((item,index)=>{
            tans[`tab${index}`] ={//`tab&{index 设置唯一的路由名字  //在这块出了问题  const tans={};定义的tans   tans[`tab${index}`] 这一块写成了 tabs[`tab${index}`] 报错信息找不到tabs 低级错误
                screen:props=><TrendingTabPage {...props} tabLabel={item}/>,//这个是动态设置属性 我们一般是直接跳转某个界面
                navigationOptions:{
                    title:item,
                }
            }
        });
        return tans
    }
    render() {
        let statusBar = {
            backgroundColor:THEME_COLOR,
            barStyle:'light-content'
        }
        let navigationBar = <NavigationBar
            title={'趋势'}
            statusBar={statusBar}
            style={{backgroundColor:THEME_COLOR}}

        />
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
                {navigationBar}
                <TabNavigator/>
            </View>
        );
    }
}
const  pageSize = 10;//设置常量 防止修改
class TrendingTab extends Component{
    constructor(props){
        super(props)
        const {tabLabel}=this.props;
        this.storeName=tabLabel;
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(loadMore){
        const  {onRefreshTrending,onLoadMoreTrending}=this.props;
        const store=this._store();
        const url = this.getFetchUrl(this.storeName);
        if (loadMore){
            onLoadMoreTrending(this.storeName,++store.pageIndex,pageSize , store.items,callback=>{
                this.refs.toast.show('没有更多了啊');
            })
        }else {
            onRefreshTrending(this.storeName,url,pageSize)
        }

    }
    _store(){
        const {trending}=this.props;
        let store =trending[this.storeName];
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
        return URL+key+`?since=daily`;
    }
    renderItem(data){
        const item=data.item;
        return <TrendingItem
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
        const {trending}=this.props;
        let store = this._store();
        return(
            <View style={styles.containerTab}>
                <FlatList data={store.projectModes}
                          renderItem={data=>this.renderItem(data)}
                          keyExtractor={item=>''+(item.id||item.fullName)}
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
                              ()=>{
                                  console.log('--------onEndReached------------')
                                  setTimeout(()=>{//增加一个定时器 是为了onEndReached在onMomentumScrollBegin后面执行
                                      if(this.canLoadMore){
                                          console.log(this.canLoadMore+'111111')
                                          this.loadData(true)
                                          this.canLoadMore=false
                                      }
                                  },100)


                              }
                          }
                          onEndReachedThreshold={0.5}
                          onMomentumScrollBegin={()=>{
                              this.canLoadMore=true //fix 初始化时页调用onEndReached的问题
                              console.log('--------onMomentumScrollBegin------------')
                          }
                          }
                />
                <Toast ref={'toast'}
                       position={'center'}/>
            </View>)
    }
}
const mapStateToPrpos=state=>({
    trending:state.trending
})
const mapDispatchToPrpos=dispatch=>({
    //将dispatch（onLoadPopular(storeName,url））绑定到props
    onRefreshTrending :(storeName,url,pageSize)=>dispatch(actions.onRefreshTrending(storeName,url,pageSize)),
    onLoadMoreTrending:(storeName,pageIndex,pageSize,items,callBack)=>dispatch(actions.onLoadMoreTrending(storeName,pageIndex,pageSize,items,callBack))
})
//connect只是个function 并不一定非要放在export后面
const TrendingTabPage =connect(mapStateToPrpos,mapDispatchToPrpos)(TrendingTab)
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

// ////////////////////////
// import React, {Component} from 'react';
// import { StyleSheet, Text, View,Button} from 'react-native';
// import {connect} from 'react-redux'
// import {onThemeChange} from "../action/theme";
// import actions from '../action'
// //如果使用 redux 下面的export default 要注释掉
// class TrendingPage extends React.Component {
//     constructor(props){
//         super(props);
//
//     }
//
//     render() {
//         const {navigation}=this.props
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.text}>{'TrendingPage'}</Text>
//                 <Button title={'修改下面的主题'}
//                         onPress={
//                             ()=>this.props.onThemeChange('black')
//                     // ()=>navigation.setParams(
//                     //     {
//                     //         theme:{
//                     //             tintColor: 'red',
//                     //             updateTime: new Date().getTime(),
//                     //         },
//                     //     }
//                     //
//                     // )
//                 }/>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor:'#447733',
//         justifyContent:'center',
//         alignItems:'center'
//     },
//     text: {
//         fontSize: 20,
//         color:'#ff70ff'
//
//     },
//
//
// });
//
// const mapDispatchToProps = dispatch=>({//这一块的问题是因为dispatch 需要有（） 我给忘写了
//     onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
// })
// export default connect(null,mapDispatchToProps)(TrendingPage)
