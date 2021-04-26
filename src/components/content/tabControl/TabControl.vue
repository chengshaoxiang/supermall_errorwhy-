<template>
  <div class="tab-control">
    <div @click="itemClick(index)" 
    v-for="(item,index) in titles" 
    :key="(item.id,index.id)" 
    class="tab-control-item" 
    :class="{active:index===currentIndex}">
    <span>{{item}}</span>
  </div>
  </div>
</template>

<script>
export default {
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
}
.tab-control-item{
  flex: 1;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 18px;
}
.active{
  color:var(--color-high-text);
  
}
.active span{
  padding:5px 10px;
  border-bottom: 3px solid var(--color-tint);
}
</style>