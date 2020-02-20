
import React, {Component} from 'react';
import { StyleSheet, Text, View,Button,TextInput} from 'react-native';

export default class FetchDemo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showText:''
        }

    }
    loadData(){
        //url  https://api.github.com/search/repositories?q=java
        console.log('自己走的')
    let url=`https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url)
            .then(response=>response.text())
            .then(responseText=>{
                this.setState({
                        showText: responseText
                })
            })

}

    loadData2(){
        //url  https://api.github.com/search/repositories?q=java
        console.log('自己走的')
        let url=`https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url)
            .then(response=>{
                if(response.ok){
                    return response.text();
                }
                throw new Error('network is wrong')
            })
            .then(responseText=>{
                this.setState({
                    showText: responseText
                })
            })
            .catch(e=>{
                    this.setState({
                        showText: e.toString()  //这块需要。toString
                    })
                }
            )

    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{'fetchDemo'}</Text>
                <View style={styles.viewContainer}>
                <TextInput style={styles.input}
                           onChangeText={text=>{
                               this.searchKey = text
                           }}
                />
                <Button title={'获取'}
                        onPress={
                            ()=>{
                                this.loadData()
                            }
                         }/>
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
        color:'#ff70ff'

    },
    input:{
        flex:1,
        height:60,
        borderColor:'red',
        borderWidth:1,
    },
    viewContainer:{
        flexDirection:'row'
    }


});
