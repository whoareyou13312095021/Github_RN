import types from "./types";


/**
 * 处理下拉刷新的数据
 * @param actionType
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 */
export function handleData( actionType,dispatch,storeName,data,pageSize) {
    let fixItems=[];
    if(data&&data.data){
        if(Array.isArray(data.data)){
            fixItems=data.data
        }else if(Array.isArray(data.data.items)){
            fixItems=data.data.items
        }

    }
    dispatch({
        type:actionType,
        items:fixItems,//在这里加了这句 否则上拉加载不起作用
        projectModes:pageSize>fixItems.length?fixItems.length:fixItems.slice(0,pageSize),//第一次要加载的数据
        storeName,
        pageIndex:1,
    })

}