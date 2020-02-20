import  React ,{Component} from 'react'
import {Text,TouchableOpacity,View,Image,StyleSheet} from 'react-native'
import FontAwesome  from 'react-native-vector-icons/FontAwesome'

export default class PopularItem extends Component {
    render() {
        const {item} = this.props;
        //这一块做一个判断
        if (!item || !item.owner) return null;
        let favoriteButton= <TouchableOpacity
                style={{padding: 6}}
            onPress={()=>{
            }}
                underlayColor={'transparent'}
            >
            <FontAwesome
            name={'star-o'}
            size={26}
            style={{color:'red'}}/>
            </TouchableOpacity>

        return(
            <TouchableOpacity
            onPress={this.props.onSelect}
            >
                <View style={styles.cell_container}>
                    <Text style={styles.title}>
                        {item.full_name}
                    </Text>
                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                    <View style={styles.row}>
                    <View style={styles.row}>
                        <Text>{'Author:'}</Text>
                        {/*<Image style={{height:22,width:22}}*/}
                                {/*source={{uri:item.owner.avatar_url}}/>//  */}
                        <Image style={{height:22,width:22}}
                               source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582111765120&di=626beedd29a0a7618d169056c025a405&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F30f9506dd558671a3aadefaac1c126ad03b5bcb456bdc-a2PKbm_fw658'}}/>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>{'Star:'}</Text>
                        <Text>{item.stargazers_count}</Text>
                    </View>
                        {favoriteButton}
                    </View>
                </View>
            </TouchableOpacity>
        )

    }
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    cell_container:{
        backgroundColor:'white',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderColor:'#dddddd',
        borderWidth:0.5,
        borderRadius:2,
        elevation: 2,//这个是针对android
        shadowColor:'#828282',
        shadowOffset:{width :0.5,height: 0.5},
        shadowRadius:1,
        shadowOpacity:0.4
    },
    title:{
        fontSize:16,
        marginBottom:2,
        color:'#212121'
    },
    description:{
        fontSize:12,
        marginBottom:2,
        color:'#737373'
    }

});
