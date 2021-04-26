<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.id" :goods-item="item">
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsListItem
  },
  methods:{
    //goodsLoad(){
    //  this.$emit('Load')
    //}
  }
}
</script>

<style scoped>
.goods{
  margin: auto;
  display: flex;
  flex-wrap:wrap;
  justify-content:space-around;
}

</style>