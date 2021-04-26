import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters'

//1.安装差件
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store({
    state: {
        cartList: []
    },
    getters,
    mutations: {
        addCounter(state, payload) {
            payload.count++
        },
        addToCart(state, payload) {
            payload.checked = true
            state.cartList.push(payload)

        }
    },
    actions: {
        addCart(context, payload) {
            return new Promise((resolve, reject) => {
                //payload为新添加的商品
                let oldProduct = null
                    //for (let item of state.cartList) {
                    //    if (item.iid === payload.iid) {
                    //        oldProduct = item
                    //    }
                    //}
                    //1.查找之前数组是否有该商品
                oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                    //2.判断是添加商品还是加一
                if (oldProduct) {
                    //oldProduct.count += 1
                    context.commit('addCounter', oldProduct)
                    resolve('当前商品数量+1')
                } else {
                    payload.count = 1
                        //context.state.cartList.push(payload)
                    context.commit('addToCart', payload)
                    resolve("添加新的商品")
                }
            })

        }
    }
})

//3.挂载Vue实例上
export default store