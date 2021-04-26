<template>
  <div>
    <swiper class="swiper-item">
      <swiper-item  v-for="item in topImages" :key="item.id">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
components:{
  Swiper,
  SwiperItem
},
methods:{
}
}
</script>

<style scoped>
  .swiper-item {
    height: 300px;
    margin-top: 136px;
  }
</style>