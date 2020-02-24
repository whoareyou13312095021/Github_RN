
import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,WebView} from 'react-native';
import NavigationBar from '../common/NavigationBar'//导入自定义的NavigationBar
import ViewUtil from "../util/ViewUtil";
const THEME_COLOR='red'
const TRENDING_URL = 'https://github.com/'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from "../navigator/NavigationUtil";
export default class DetailPage extends React.Component {
    constructor(props){
        super(props)
        this.params=this.props.navigation.state.params;
        const {projectModes}=this.params
        console.log('2222222222222',this.props.navigation.state.params+'2')
        this.url= projectModes.html_url||TRENDING_URL+projectModes.fullName;
        const  title = projectModes.full_name||projectModes.fullName;
        this.state={
            title:title,
            url:this.url,
            canGoBack:false,
        }
    }
    onBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        }else {
            NavigationUtil.goBack(this.props.navigation);
        }

    }
    renderRightButton(){
        return(<View style={{flexDirection:'row'}}>
                <TouchableOpacity
                onPress={()=>{

                }}
                >
                <FontAwesome
                name={'star-o'}
                size={20}
                style={{color: 'white',marginRight:10}}/>
                </TouchableOpacity>
                {ViewUtil.getShareButton(()=>{

                })}
            </View>
        )
    }

    onNavigationStateChange(navState){
        this.setState({
            canGoBack: navState.canGoBack,
             url:navState.url,
        })

    }
    render() {
        let navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(()=>this.onBack())}
            title={this.state.title}
            style={{backgroundColor:THEME_COLOR}}
            rightButton={this.renderRightButton()}
            />
        return (
            <View style={styles.container}>
                {navigationBar}
                <WebView
                ref={webView=>this.webView=webView}
                startInLoadingState={true}
                onNavigationStateChange={e=>this.onNavigationStateChange(e)}
                source={{uri:this.state.url}}
                />
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
