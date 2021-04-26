import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from '@/components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
    //事件总线
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//图片懒加载
Vue.use(VueLazyLoad)

//解决移动端300ms的延迟
FastClick.attach(document.body)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')