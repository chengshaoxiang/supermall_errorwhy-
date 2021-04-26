<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.id" class="recommend_item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 18px;
    border-bottom: 8px solid #eee;
  }
  .recommend item{
    margin-top: 8px;
    flex: 1;
  }
  .recommend_item img{
      width: 80%;
    }
</style>