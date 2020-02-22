import types from '../types'
import DataStore, {FLAT_STORAGE} from '../../expand/dao/DataStore'
import {handleData} from '../ActionUtil'
/**
 * 获取最热数据的异步action
 * @param theme
 * pageSize
 * @returns {{type: string, theme: *}}
 */
export function onRefreshTrending(storeName,url,pageSize) { //后来按照那个视频一直报url的错 原因是我把这一行的url写成了Url 而下面调用的是 url  所以找不到
    //这里storeName  是代表上面的标题栏  例如 是android 还是 iOS等
    return dispatch=>{   //最后在调试的时候报错 就是一直加载不出来 看日志 说是dispatch没定义 看代码第二次错误 dispatch写成dispath  而下面用的是dispatch
        dispatch({
            type:types.TRENDING_REFRESH ,
            storeName:storeName
        })
        let dataStore = new DataStore();
        dataStore.fetchData(url,FLAT_STORAGE.flag_trending) //异步action与数据流
            .then(
                data =>{
                    handleData(types.TRENDING_REFRESH_SUCCESS,dispatch,storeName,data,pageSize)//第一次错误这句话没写
                }
            ).catch(
                error=>{
                    console.log(error.toString());
                     dispath({
                        type:types.TRENDING_REFRESH_FAIL ,
                        storeName:storeName,  //这一块也可以这么写  直接就一个storeName
                         error
                    })
                }
        )
    }

}
export function onLoadMoreTrending(storeName,pageIndex,pageSize,dataArray=[],callBack) {
    return dispatch =>{
        setTimeout(()=>{//模拟一个网络请求
            if((pageIndex-1)*pageSize>=dataArray.length){//已加载完全部数据
                if(typeof callBack === 'function'){
                    callBack('no more')
                }
                dispatch({
                    type:types.TRENDING_LOAD_MORE_FAIL,
                    error:'no more',
                    storeName:storeName,
                    pageIndex:--pageIndex,
                    projectModes:dataArray
                })
            }else {
                //本次和载入的最大数量
                let  max = pageSize*pageIndex>dataArray.length?dataArray.length:pageSize*pageIndex;
                dispatch({
                    type:types.TRENDING_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0,max)
                })
            }
        },500);
    }
    
}
