<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
//import observeDom from '@better-scroll/observe-dom'

//BScroll.use(observeDom)

export default {
  data(){
    return{
      scroll:null,
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    //在vue里用类名来拿dom元素，容易出现错误，因为类名可能会重复
    //this.scroll = new BScroll(document.querySelector('.wrapper'),{
    //observeDom:true,
    //probeType:2,
    //pullUpLoad:true
    //})
    //console.log(BScroll);
      this.scroll = new BScroll(this.$refs.wrapper,{
      scrollY:true,
      click:true,
      //observeDom: true
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    //监听滚动的位置
    this.scroll.on('scroll',position =>{
      this.$emit('scroll',position)
    })
    //监听上拉事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
    }
    //console.log(this.scroll);
    //this.scroll.scrollTo(0,0)
  },
    methods:{
      scrollTo(x, y, time){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      }
    }
       }
</script>

<style scoped>
</style>