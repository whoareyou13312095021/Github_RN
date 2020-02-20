import {createAppContainer,createSwitchNavigator}from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomePage from '../page/HomePage'
import WelcomePage from '../page/WelcomePage'
import DetailPage from '../page/DetailPage';
import FetchDemo from  '../page/FetchDemo'
import AsyncStorageDemo from '../page/AsyncStorageDemo'
import DataStorageDemo from  '../page/DataStorageDemo'
const initNavigator =createStackNavigator(
    {
        WelcomePage:{
            screen:WelcomePage,
            navigationOptions:{
                header:null//隐藏header
            }
        },
    }
)

const mainNavigator =createStackNavigator(
    {
        HomePage:{
            screen:HomePage,
            navigationOptions:{
                header:null//隐藏header
            },
        },
        DetailPage:DetailPage,
        FetchDemo:{
            screen:FetchDemo,
            navigationOptions:{
                header:null//隐藏header
            },
        },
        AsyncStorageDemo:{
            screen:AsyncStorageDemo,
            navigationOptions:{
                header:null//隐藏header
            },
        },
        DataStorageDemo:{
            screen:DataStorageDemo,
            navigationOptions:{
                header:null//隐藏header
            },
        },
    }
)


export default createAppContainer(createSwitchNavigator(
    {
        Init:initNavigator,
        Main:mainNavigator
    },
    {
        navigationOptions:{
            header:null,
        }
    }
))