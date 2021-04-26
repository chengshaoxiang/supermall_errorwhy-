import Toast from '@/components/common/toast/Toast'

const obj = {}

obj.install = function(Vue) {
    //Vue.extend(Toast)
    //document.body.appendChild(Toast.$el)

    const toastConstructor = Vue.extend(Toast)
    const toast = new toastConstructor()
    toast.$mount(document.createElement('div'))
    document.body.appendChild(toast.$el)
    Vue.prototype.$toast = toast;
}

export default obj