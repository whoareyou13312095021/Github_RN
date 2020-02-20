export default  class NavigationUtil {
    /**
     *
     * @param params 要传递的参数
     * @param page 要跳转的页面名（页面路由名字）
     */
    static goPage(params,page){
        debugger
       const navigation = NavigationUtil.navigation;
        if(!navigation){
            console.log('NavigationUtil.navigation not found')
        }
        navigation.navigate(page, {...params,},)
    };
    /**
     *  重置到首页
     * @param params
     */
    static  resetToHomePage(params) {
        const {navigation} = params;
        navigation.navigate('Main');
    }
    
}