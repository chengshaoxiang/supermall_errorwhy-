<template>
  <div>
        <nav-bar class="navbar">
          <div slot="left" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="" class="back">
          </div>
          <div slot="center" class="title">
            <div class="item-title" 
            v-for="(item,index) in titles" 
            :key="(item.id,index.id)"
            :class="{active:index==currentIndex}"
            @click="titleClick(index)">{{item}}</div>
          </div>
        </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
export default {
  components:{
    NavBar
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex : 0
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick(){
      //this.$router.go(-1)
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .navbar{
    background-color: #fff;
  }
  .title {
    display: flex;
  }
  .item-title{
    flex: 1;
    font-size: 15px;
  }
  .active{
    color: var(--color-high-text);
  }
  .back{
    margin-top: 12px;
  }
</style>