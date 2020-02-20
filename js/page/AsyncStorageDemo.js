
import React, {Component} from 'react';
import { StyleSheet, Text, View,Button,TextInput,AsyncStorage} from 'react-native';
const  KEY='save_key'
export default class AsyncStorageDemo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showText:''
        }

    }
    doSave(){
        AsyncStorage.setItem(KEY,this.value,error=>{
            error&&console.log(error.toString())
        })

    }
    doRemove(){
        AsyncStorage.removeItem(KEY,error=>{
            error&&console.log(error.toString())
        })
    }
    doGet(){
        AsyncStorage.getItem(KEY,(error,value)=>{
            this.setState({
                showText:value
            });
            console.log(value);
            error&&console.log(error.toString())
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{'异步处理'}</Text>
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
                            this.doSave()
                        }
                    }>{'存储'}</Text>
                    <Text style={styles.text} onPress={
                        ()=>{
                            this.doRemove()
                        }}>{'删除'}</Text>
                    <Text style={styles.text} onPress={
                        ()=>{
                            this.doGet()
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
