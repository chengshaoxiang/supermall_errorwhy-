<template>
  <div class="cart-list">
    <scroll class="wrapper" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="(item.id,index.id)" :itemInfo = "item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Scroll from '../../../components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'

export default {
  components:
   { Scroll,
    CartListItem 
    },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list{
    height: 100vh - 44px - 49px - 40px;
  }
  .wrapper{
    height: calc(100vh - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>