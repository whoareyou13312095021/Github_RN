import {AsyncStorage} from 'react-native';
import Trending from 'GitHubTrending';
export const FLAT_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
export default class DataStore {

    /**
     * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
     * @param flag  这个flag标识就是FLAT_STORAGE里面的标识
     * @param url
     * @returns {Promise}
     */
    fetchData(url,flag) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then((wrapData) => {
                if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData);
                } else {
                    this.fetchNetData(url,flag).then((data) => {
                        resolve(this._wrapData(data));
                    }).catch((error) => {
                        reject(error);
                    })
                }

            }).catch((error) => {
                this.fetchNetData(url,flag).then((data) => {
                    resolve(this._wrapData(data));
                }).catch((error => {
                    reject(error);
                }))
            })
        })
    }

    /**
     * 保存数据
     * @param url
     * @param data
     * @param callback
     */
    saveData(url, data, callback) {
        if (!data || !url) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
    }

    /**
     * 获取本地数据
     * @param url
     * @returns {Promise}
     */
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }

    /**
     * 获取网络数据
     * @param url
     *  @param flag
     * @returns {Promise}
     */
    fetchNetData(url,flag) {
        return new Promise((resolve, reject) => {
            //这里面判断一下请求的flag
            if(flag!==FLAT_STORAGE.flag_trending){
                fetch(url)
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Network response was not ok.');
                    })
                    .then((responseData) => {
                        this.saveData(url, responseData)
                        resolve(responseData);
                    })
                    .catch((error) => {
                        reject(error);
                    })
            }else {
                new Trending().fetchTrending(url)
                    .then(items=>{
                        if(!items){
                            throw  new Error('responseData is mull')
                        }
                        this.saveData(url,items);
                        resolve(items);
                    })
                    .catch(error=>{
                        reject(error);
                    })
            }

        })
    }

    _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()};
    }

    /**
     * 检查timestamp是否在有效期内
     * @param timestamp 项目更新时间
     * @return {boolean} true 不需要更新,false需要更新
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() - targetDate.getHours() > 4) return false;//有效期4个小时
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
        return true;
    }
}



// import {AsyncStorage} from 'react-native'
// export default  class DataStore {
//
//     fetchData(url){
//         return new Promise((resolve,reject)=>{
//             this.fetchLocalData(url).then((wrapData)=>{
//                 if(wrapData&&DataStore.checkTimestampVaild(wrapData.timestamp)){
//                     resolve(wrapData)
//                 }else {
//                     this.fetchNetData(url).then((data)=>{//自己写的时候没有出来  是因为将fetchNetData写成了fetchLocalData
//                         resolve(this._warpData(data));
//                     }).catch((error)=>{
//                         reject(error);
//                     })
//                 }
//             }).catch((error)=>{
//                 this.fetchNetData(url).then((data)=>{
//                     resolve(this._warpData(data))
//                 }).catch((error)=>{
//                     reject(error)
//                 })
//             })
//         })
//
//
//     }
//     /**
//      * 保存数据
//      * @param url
//      * @param data
//      * @param callback
//      */
//     saveData(url,data,callback){
//         if(!url||!data) return;
//         AsyncStorage.setItem(url,JSON.stringify(this._warpData(data)),callback)
//
//     }
//     fetchLocalData(url){
//         return new Promise(
//             (resolve,reject)=>{
//                 AsyncStorage.getItem(url,(error,result)=>{
//                     if(!error){
//                         try {
//                             resolve(JSON.parse(result))
//                         }catch (e) {
//                             reject(e);
//                             console.error(e);
//                         }
//                     }else{
//                         reject(error);
//                         console.error(error);
//                     }
//                 })
//             })
//     }
//     _warpData(data){
//         return{
//             data:data,
//             timestamp:new Date().getTime()
//         }
//
//     }
//     fetchNetData(url){
//         return new Promise((resolve,reject)=>{
//             fetch(url)
//                 .then((response)=>{
//                     if(response.ok){
//                         return response.json();
//                     }
//                     throw new Error('network response is not ok')
//                 })
//                 .then((responseData)=>{
//                     this.saveData(url,responseData);
//                     resolve(responseData)
//                 })
//                 .catch((error)=>{
//                     reject(error)
//                 })
//
//         })
//     }
//
//     static  checkTimestampVaild(timestamp){
//             const  currentDate =new Date();
//             const  targetDate =new Date();
//             targetDate.setTime(timestamp);
//             if(currentDate.getMonth()!==targetDate.getMonth()) return false;
//             if(currentDate.getDate()!==targetDate.getDate()) return false;
//             if(currentDate.getHours()!==targetDate.getHours()) return false;
//             return true;
//
//
//     }
//
// }