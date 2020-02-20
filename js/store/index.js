import {applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer'

const logger = store=>next=>action=>{
    if(typeof action==='function'){
        console.log('dispacth a function')
    }else {
        console.log('dispacth',action)
    }
    const  result =next(action);
    console.log('next stage',store.getState())
    return result
}
const middlewares=[
    logger,
    thunk
];
// /**
//  *2 创建store
//  * **/
export default  createStore(reducers,applyMiddleware(...middlewares));
