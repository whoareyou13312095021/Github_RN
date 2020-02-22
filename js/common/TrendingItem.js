import  React ,{Component} from 'react'
import {Text,TouchableOpacity,View,Image,StyleSheet} from 'react-native'
import FontAwesome  from 'react-native-vector-icons/FontAwesome'
import HTMLView from  'react-native-htmlview'

export default class TrendingItem extends Component {
    render() {
        const {item} = this.props;
        //这一块做一个判断
        if (!item ) return null;
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
        let description='<p>'+item.description+'</p>'
        return(
            <TouchableOpacity
            onPress={this.props.onSelect}
            >
                <View style={styles.cell_container}>
                    <Text style={styles.title}>
                        {item.fullName}
                    </Text>
                    <Text style={styles.description}>
                        {item.meta}
                    </Text>
                    <HTMLView
                    value={description}
                    onLinkPress={()=>{

                    }}
                    stylesheet={{
                        p:styles.description,
                        a:styles.description,
                    }}
                    />
                    {/*<Text style={styles.description}>*/}
                        {/*{item.description}*/}
                    {/*</Text>*/}
                    <View style={styles.row}>
                    <View style={styles.row}>
                        <Text>{'build by:'}</Text>
                        {/*<Image style={{height:22,width:22}}*/}
                                {/*source={{uri:item.owner.avatar_url}}/>//  */}
                        {item.contributors.map((result,i,arr)=>{
                            if(i<=3){//这里由于最大目前是10显示不下  增加一个判断  让其最大显示四个  而且视频里的图像url地址显示不了 所以使用默认图片
                            return <Image style={{height:22,width:22,margin:2}}
                                          key={i}
                                          source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582111765120&di=626beedd29a0a7618d169056c025a405&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F30f9506dd558671a3aadefaac1c126ad03b5bcb456bdc-a2PKbm_fw658'}}/>
                            }
                        })}

                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>{'Star:'}</Text>
                        <Text>{item.starCount }</Text>
                    </View>

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
