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
        case types.LOAD_POPULAR_SUCCESS:
            return {
                ...state,//延展操作符
               [action.storeName]:{
                   ... state[action.storeName],
                   items:action.items,
                   isLoading:false,
               }
            };
            case types.POPULAR_REFRESH:
                return {
                    ...state,//延展操作符
                    [action.storeName]:{
                        ... state[action.storeName],
                        isLoading:true,
                    }
                };

        case types.LOAD_POPULAR_FAIL:
            return {
                ...state,//延展操作符
                [action.storeName]:{
                    ... state[action.storeName],
                    isLoading:false,
                }
            };
        default :return state;
    }


}