<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked ="isSelectAll" class="check-button" @click.native = "checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">去计算 : ({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'

export default {
  components: { 
    CheckButton 
    },
  computed:{
    totalPrice(){
      return '￥' + this.$store.state.cartList.filter(item =>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue += item.price * item.count 
      },0)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      //return !this.$store.state.cartList.filter(item => !item.checked).length
      if(this.$store.state.cartList.length === 0)
      return false
      return !this.$store.state.cartList.find(item => !item.checked)
  }
},  
    methods:{
      checkClick(){
        if(this.isSelectAll){
          this.$store.state.cartList.forEach(item => item.checked =false)
        }else{
           this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品',2000)
        }
      }
    }}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position: relative;
    display: flex;
    align-items: center;
  }
  .check-button{
    width: 22px;
    height: 22px;
    margin-left: 20px;
    margin-right: 10px;
    line-height: 20px;
  }
  .check-content{
    display: flex;
    line-height: 40px;
    align-items: center;
  }
  .price{
    margin-left: 28px;
  }
  .calculate{
    width: 100px;
    height: 100%;
    line-height: 40px;
    margin-left: 50px;
    margin-left: auto;
    text-align: center;
    background-color: red;
    color: #fff;
  }
</style>