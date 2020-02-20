import  {combineReducers} from 'redux';
import theme from './theme'
import populor from './popular'
//
// /**
//  *1. 合并reducer
//  * @type {Reducer<CombinedState<any>> | Reducer<CombinedState<any>, AnyAction> | Reducer<CombinedState<StateFromReducersMapObject<{}>>, ActionFromReducersMapObject<{}>>}
//  */
const  index=combineReducers({
   theme:theme,
    populor:populor,

});
export default index;