
import React, {Component} from 'react';
import { StyleSheet, Text, View,Button,FlatList,RefreshControl,ActivityIndicator,TouchableOpacity,DeviceEventEmitter} from 'react-native';
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
import TrendingDialog,{TimeSpans}  from '../common/TrendingDialog'
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const EVENT_TYPE_TIME_SPAN_CHANGE ='EVENT_TYPE_TIME_SPAN_CHANGE';

export default class TrendingPage extends React.Component {
    constructor(props){
        super(props)
        this.tabNames=['c','c#','php','javascript'];//视频里的all  这个模块 里面没有数据
        this.state={
            timeSpan:TimeSpans[2],
        }
    }
    //动态生成tab
    _genTabs(){
        const tans={};
        this.tabNames.forEach((item,index)=>{
            tans[`tab${index}`] ={//`tab&{index 设置唯一的路由名字  //在这块出了问题  const tans={};定义的tans   tans[`tab${index}`] 这一块写成了 tabs[`tab${index}`] 报错信息找不到tabs 低级错误
                screen:props=><TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item}/>,//这个是动态设置属性 我们一般是直接跳转某个界面
                navigationOptions:{
                    title:item,
                }
            }
        });
        return tans
    }
    renderTitleView(){
        return <View>
            <TouchableOpacity
            underlayColor='transparent'
            onPress={()=>this.dialog.show()}>
                <View style={{flexDirection:'row',alignItems: 'center' }}>
                    <Text style={{fontSize:18,color:'#FFFFFF',fontWeight: '400'}}>
                        趋势 {this.state.timeSpan.showText}
                    </Text>
                    <MaterialIcons
                    name={'arrow-drop-down'}
                    size={22}
                    style={{color:'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    onSelectTimeSpan(tab){
        debugger
        this.dialog.dismiss();
        this.setState({
            //这里出现了问题 setstate  后面给写上=号 导致选择上的状态更新不了  这个问题 卡了不短时间 一直没注意到 知道是这里的问题但是没有在意 太失误了 写上=号就赋不上值了
            timeSpan:tab,
            // console.log('到底获取到值没有',timeSpan)
        })
        DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE,tab)

    }
    renderTrendingDialog(){
        return <TrendingDialog
        ref={dialog=>this.dialog=dialog }
        onSelect={tab=>this.onSelectTimeSpan(tab)}
        />
    }

    _tabNav(){
        if(!this.tabNav){
            this.tabNav=createAppContainer(
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
        }
        return this.tabNav;

    }
    render() {
        let statusBar = {
            backgroundColor:THEME_COLOR,
            barStyle:'light-content'
        }
        let navigationBar = <NavigationBar
            // title={'趋势'}
            titleView={this.renderTitleView()}
            statusBar={statusBar}
            style={{backgroundColor:THEME_COLOR}}

        />
        const  TabNavigator = this._tabNav();
        return (
            <View style={styles.container}>
                {navigationBar}
                <TabNavigator/>
                {this.renderTrendingDialog()}
            </View>
        );
    }
}
const  pageSize = 10;//设置常量 防止修改
class TrendingTab extends Component{
    constructor(props){
        super(props)
        const {tabLabel,timeSpan}=this.props;
        this.storeName=tabLabel;
        this.timeSpan=timeSpan;
    }
    componentDidMount(){
        this.loadData();
        this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE,(timeSpan)=>{
            this.timeSpan=timeSpan;
            this.loadData();
        })
    }

    componentWillUnmount(){
        if(this.timeSpanChangeListener){
            this.timeSpanChangeListener.remove();
        }
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
        return URL+key+`?`+this.timeSpan.searchText;//`?since=daily`
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
