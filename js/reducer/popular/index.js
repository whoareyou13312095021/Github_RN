import types from '../../action/types'

const defaultState={
}
/**
 * popular:{
 *     java:{
 *         item;[],
 *         isloading:false
 *     },
 *     ios:{
 *         item;[],
 *         isloading:false
 *     },
 * }
 * state数 横向扩展
 * 如何动态的扩展store 和动态获取store （难点 store key不固定）
 *
 * @param state
 * @param action
 * @returns {{theme: *}}
 */
export default function onAction(state = defaultState,action) {
    switch (action.type) {
        case types.POPULAR_REFRESH_SUCCESS://下拉刷新成功
            return {
                ...state,//延展操作符
               [action.storeName]:{
                   ... state[action.storeName],
                   items:action.items,//原始数据
                   projectModes:action.projectModes,//此次展示的数据
                   isLoading:false,
                   hiddeLoadingMore:false,
                   pageIndex:action.pageIndex,
               }
            };
            case types.POPULAR_REFRESH://下拉刷新
                return {
                    ...state,//延展操作符
                    [action.storeName]:{
                        ... state[action.storeName],
                        isLoading:true,
                    }
                };

        case types.POPULAR_REFRESH_FAIL://下拉刷新失败
            return {
                ...state,//延展操作符
                [action.storeName]:{
                    ... state[action.storeName],
                    isLoading:false,
                }
            };

        case types.POPULAR_LOAD_MORE_SUCCESS://上拉加载更多成功
            return {
                ...state,//延展操作符
                [action.storeName]:{
                    ... state[action.storeName],
                    projectModes:action.projectModes,
                    hiddeLoadingMore:false,
                    pageIndex:action.pageIndex,

                }
            };
        case types.POPULAR_LOAD_MORE_FAIL://上拉加载失败
            return {
                ...state,//延展操作符
                [action.storeName]:{
                    ... state[action.storeName],
                    hiddeLoadingMore:true,
                    pageIndex:action.pageIndex,

                }
            };
        default :return state;
    }


}