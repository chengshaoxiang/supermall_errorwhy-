<template>
  <div class="detail">
        <detail-nav-bar @titleClick = 'titleClick' ref="detailnav"></detail-nav-bar>
        <scroll class="wrapper-detail" ref="scroll" @scroll ="contentScroll" :probe-type="3">
          <detail-swiper :top-images="topImage"></detail-swiper>
          <detail-base-info :goods="goods"></detail-base-info>
          <detail-shop-info :shop="shop"></detail-shop-info>
          <detail-goods-info :detail-info = "detailInfo"></detail-goods-info>
          <detail-param-info ref="params" :param-info = "paramInfo"></detail-param-info>
          <detail-comment-info ref="comment" :comment-info = "commentInfo"></detail-comment-info>
          <goods-list ref="recommend" :goods="recommends"></goods-list>
        </scroll>
          <detail-bottom-bar @addToCart = "addToCart"></detail-bottom-bar>
          <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
          <!--<toast :message="message" :show = "show"></toast>-->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import {getDetail,Goods, Shop ,GoodsParam,getRecommend} from 'network/detail.js'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import scroll from 'components/common/scroll/Scroll'
import DetailShopInfo from '@/views/detail/childComps/DetailShopInfo.vue'
import DetailGoodsInfo from '@/views/detail/childComps/DetailGoodsInfo'
import DetailParamInfo from '@/views/detail/childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import {itemListenerMixin} from "common/mixin.js"
import { debonce } from "common/utils.js"
import DetailBottomBar from './childComps/DetailBottomBar.vue'
import BackTop from '@/components/content/backTop/BackTop'
//import Toast from '@/components/common/toast/Toast'


export default {
  name:'Detail',
  mixins:[itemListenerMixin],
  data(){
    return{
      iid:null,
      topImage:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      itemImgListener:null,
      themeTopsYs:[],
      getThemeTopYs:null,
      currentIndex:0,
      isShowBackTop:false,
      //message:'',
      //show:false
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    //Toast
  },
  created(){
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid请求数据
    getDetail(this.iid).then(res =>{
      //1.获取顶部的图片轮播数据
      const data = res.result
      //console.log(data);
      this.topImage = data.itemInfo.topImages
      //console.log(this.topImage);
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo)
      //console.log(this.shop);
      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo
      //5.获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //6.获取评论信息
      if(data.rate.cRate != 0){
        this.commentInfo = data.rate.list[0]
      };
      //this.$nextTick(()=>{
      //  //根据最新的数据，对应的dom已经被渲染出来，但图片没有加载完
      //  this.themeTopsYs.push(0);
      //  this.themeTopsYs.push(this.$refs.params.$el.offsetTop);
      //  this.themeTopsYs.push(this.$refs.comment.$el.offsetTop);
      //  this.themeTopsYs.push(this.$refs.recommend.$el.offsetTop);
      //  console.log(this.themeTopsYs);
      //})
    })
      
    //请求推荐数据
    getRecommend().then(res =>{
      //console.log(res);
      this.recommends = res.data.list
    })

    //给getThemeTopYs赋值
    this.getThemeTopYs = debonce(()=>{
             this.themeTopsYs = []
             this.themeTopsYs.push(0);
            this.themeTopsYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopsYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopsYs.push(this.$refs.recommend.$el.offsetTop);
    },100)
  },
  //methods:{
  //  iamgeLoad(){
  //    this.$refs.scroll.refresh()
  //  }
  //},
  mounted(){
    const refresh = debonce(this.$refs.scroll.refresh, 500);
        this.$bus.$on('goodsImgLoad', () => {
            //this.$refs.homeScroll.refresh()
            refresh()  
            this.getThemeTopYs()          
        });
  },
  //updated(){
  //      this.themeTopsYs = []
  //      this.themeTopsYs.push(0);
  //      this.themeTopsYs.push(this.$refs.params.$el.offsetTop);
  //      this.themeTopsYs.push(this.$refs.comment.$el.offsetTop);
  //      this.themeTopsYs.push(this.$refs.recommend.$el.offsetTop);
  //      console.log(this.themeTopsYs);
  //},
  destroyed(){
    this.$bus.$off('imageLoad',this.itemImgListener);
  },
  methods:{
    titleClick(index){
      //console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopsYs[index],1000)
    },
    contentScroll(position){
      //获取y值
      const positionY = -position.y
      //和之前获得的组件里的offsetTop值进行对比
      for(let i in this.themeTopsYs){
        i = parseInt(i)
        if(this.currentIndex !==i){
          if(i < this.themeTopsYs.length-1){
          if(positionY >= this.themeTopsYs[i] && positionY < this.themeTopsYs[i+1]){
          this.currentIndex = i;
          this.$refs.detailnav.currentIndex =this.currentIndex
          }
        }else{
          if(positionY >= this.themeTopsYs[i]){
            this.currentIndex = i;
            this.$refs.detailnav.currentIndex =this.currentIndex
          }
        }
        }
      }
      //是否显示回到顶部
       this.isShowBackTop = -position.y > 1000
    },   
    backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
   addToCart(){
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImage[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        //console.log(this.iid);
        //2.将商品加入购物车
        this.$store.dispatch('addCart',product).then(res =>{
          //this.show = true;
          //this.message = res;
          //setTimeout(()=>{
          //  this.show = false;
          //  this.message = ''
          //},1500)
          this.$toast.show(res,2000)
          console.log(this.$toast);
        })
      }
  }
}
</script>

<style scoped>
.detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
/*.detail-nav{
  background-color: #fff;
}*/
  /*.detail-nav{
    position: relative;
    z-index: 999;
    background-color: #fff;
  }*/
  .wrapper-detail{
    height: calc(100% - 49px - 44px);
    /*height: 300px;*/
    overflow: hidden;
  }
 
</style>