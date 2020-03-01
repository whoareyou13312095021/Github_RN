
import React, {Component} from 'react';
import DynamicTabnavigator from '../navigator/DynamicTabnavigator';
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent'
import {NavigationActions} from 'react-navigation'
type Props = {};
export default class HomePage extends React.Component {
    constructor(props){
        super(props)
        this._back =this.onBackPress.bind(this)//需要重新绑定
        this.backPress = new BackPressComponent({backPress: this._back});//或是不写上面那句话  写成这样也行（）=>this.backPress
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }
    onBackPress =()=>{
        const  {dispatch,nav}= this.props;
        if(nav.routes[1].index===0){
            return false
        }
        dispatch(NavigationActions.back());
        return true;
    }

    render(){
        //修复DynamicTabnavigator中的界面无法跳转到外部导航器页面的问题
        NavigationUtil.navigation = this.props.navigation;
        return  <DynamicTabnavigator/>;
    }
}

