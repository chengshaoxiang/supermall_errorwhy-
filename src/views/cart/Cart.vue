<template>
<div class="cart">
   <nav-bar class="nav-bar">
     <div slot="center">购物车({{cartLength}})</div>
   </nav-bar>

   <!--商品的列表-->
   <cart-list></cart-list>
   <!--底部汇总-->
   <cart-bottom-bar></cart-bottom-bar>
</div>
</template>

<script>
 import NavBar from '@/components/common/navbar/NavBar' 
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
//import { mapGetters } from 'vuex'

export default {
  components:{
   NavBar,
   CartList,
   CartBottomBar
 },
 computed:{
   cartLength(){
     return this.$store.state.cartList.length
   }
 }
}
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-size: 23px;
    text-align: center;
    overflow: hidden;
    position: relative;
    z-index: 9;
  }
</style>