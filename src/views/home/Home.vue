<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">首页</div></nav-bar>
    <tab-control ref="tabControl1" 
        :titles="['流行','新款','精选']" 
        @tabClick="tabClick"
        class="tab-control"
        v-show="isTabFixed"
        >
        </tab-control>
      <scroll class="wrapper" ref="homeScroll" 
      :probe-type="3" @scroll="contentScroll" 
      :pull-up-load="true" @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control ref="tabControl2" 
        :titles="['流行','新款','精选']" 
        @tabClick="tabClick"
        class="tab-control">
        </tab-control>
        <goods-list :goods="showGoods" ></goods-list>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
import TabControl from '../../components/content/tabControl/TabControl.vue'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from '@/components/content/backTop/BackTop'
import { debonce } from "common/utils.js"
//import {itemListenerMixin} from "common/mixin.js"

export default {
  components:{
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop
  },
  //mixins:[itemListenerMixin],
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      itemImgListener:null
    }
  },
  computed:{
    showGoods(){
        return  this.goods[this.currentType].list
    },
  },
  activated(){
    this.$refs.homeScroll.scrollTo(0,this.saveY)
        this.$refs.homeScroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.homeScroll.scroll.y
    //console.log(this.$refs.homeScroll);
    //取消全局事件的监听
    this.$bus.$off('imageLoad',this.itemImgListener)
  },
   created() {
     //请求多个数据
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
   mounted(){
      //监听图片加载完成  事件总线
         const refresh = debonce(this.$refs.homeScroll.refresh, 500);
        this.itemImgListener = () => refresh();
        this.$bus.$on('imageLoad', this.itemImgListener);
      //this.$refs.homeScroll.refresh()
      //console.log('------------------');
      //获取tabControl的offsetTop
      //所有的组件都有一个属性$el:用于获取组件中的元素
        //this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        //console.log(this.tabOffsetTop);
  },
  methods:{
   //事件监听相关方法
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        };
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick(){
        this.$refs.homeScroll.scrollTo(0,0,500)
      },
      //errLoad(){
      //  this.$refs.homeScroll.scroll.refresh()
      //},
      contentScroll(position){
        //判断BackTop是否显示
        this.isShowBackTop = -position.y > 1000

        //决定tabControl是否吸顶 (position：fixed)
        this.isTabFixed = -position.y > this.tabOffsetTop
      },
      loadMore(){
      this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        //console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
    //网络请求相关方法
    getHomeMultidata(){
       getHomeMultidata().then(res=>{
      //console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list
      })
      },
    getHomeGoods(type){
        let page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.homeScroll.finishPullUp()
      })
      }
    }
  }

</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color:#fff
  }
  /*#home{
    margin-top: 44px;
  }*/

 .wrapper{
   /*height: calc(100vh - 93px);*/
   overflow: hidden;
   position: absolute;
   top: 44px;
   bottom: 49px;
   left: 0;
   right: 0;
 }

 .tab-control{
   position: relative;
   z-index: 999;
   background-color: #fff;
 }
</style>