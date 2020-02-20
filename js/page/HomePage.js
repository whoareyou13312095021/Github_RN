
import React, {Component} from 'react';
import DynamicTabnavigator from '../navigator/DynamicTabnavigator';
import NavigationUtil from '../navigator/NavigationUtil';

export default class HomePage extends React.Component {

    render(){
        //修复DynamicTabnavigator中的界面无法跳转到外部导航器页面的问题
        NavigationUtil.navigation = this.props.navigation;
        return  <DynamicTabnavigator/>;
    }
}

