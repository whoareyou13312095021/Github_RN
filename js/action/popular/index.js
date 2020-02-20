import types from '../types'
import DataStore from '../../expand/dao/DataStore'

/**
 * 获取最热数据的异步action
 * @param theme
 * @returns {{type: string, theme: *}}
 */
export function onLoadPopularData(storeName,url) { //后来按照那个视频一直报url的错 原因是我把这一行的url写成了Url 而下面调用的是 url  所以找不到
    //这里storeName  是代表上面的标题栏  例如 是android 还是 iOS等
    return dispatch=>{   //最后在调试的时候报错 就是一直加载不出来 看日志 说是dispatch没定义 看代码第二次错误 dispatch写成dispath  而下面用的是dispatch
        dispatch({
            type:types.POPULAR_REFRESH ,
            storeName:storeName
        })
        let dataStore = new DataStore();
        dataStore.fetchData(url) //异步action与数据流
            .then(
                data =>{
                    handleData(dispatch,storeName,data)//第一次错误这句话没写
                }
            ).catch(
                error=>{
                    console.log(error.toString());
                     dispath({
                        type:types.LOAD_POPULAR_FAIL ,
                        storeName:storeName,  //这一块也可以这么写  直接就一个storeName
                         error
                    })
                }
        )
    }

}

function handleData(dispatch,storeName,data) {
    dispatch({
        type:types.LOAD_POPULAR_SUCCESS,
        items:data&&data.data&&data.data.items,
        storeName,
    })
    
}