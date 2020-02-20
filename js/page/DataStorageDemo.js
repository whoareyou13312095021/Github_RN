
import React, {Component} from 'react';
import { StyleSheet, Text, View,Button,TextInput,AsyncStorage} from 'react-native';
import DataStore from '../expand/dao/DataStore'
const  KEY='save_key'
export default class DataStorageDemo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showText:''
        }
        this.dataStore=new DataStore();
    }
    loadData(){
        let url=`https://api.github.com/search/repositories?q=${this.value}`;
        // let url=`https://api.github.com/search/repositories?q=${this.searchKey}`;
        this.dataStore.fetchData(url).then(
            data=>{
                let showData=`在此数据加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;;
                this.setState({
                    showText: showData
                })
            }
        ).catch(
            error=>{
                error&&console.log(error.toString())
            }
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{'离线缓存框架测试'}</Text>
                <View style={styles.viewContainer}>
                <TextInput style={styles.input}
                           onChangeText={text=>{
                               this.value = text//这里我未定义  原来是searchKey
                           }}
                />
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.text} onPress={
                        ()=>{
                            this.loadData()
                        }}>{'获取'}</Text>
                </View>
                <Text style={styles.text}>{this.state.showText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#447733',
        // justifyContent:'center',
        alignItems:'center'
    },
    text: {
        fontSize: 20,
        color:'#ff70ff',
        marginLeft:30

    },
    input:{
        flex:1,
        height:60,
        borderColor:'red',
        borderWidth:1,
    },
    viewContainer:{
        flexDirection:'row',
    }


});
