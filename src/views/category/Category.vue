<template>
  <div id="category">
    <nav-bar class="navbar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
        <tab-menu :categories="categories" @selectItem ='selectItem'></tab-menu>
         <scroll id="tab-content" :data="categoryData"  ref="homeScroll">
             <div>
                  <tab-content-category :subcategories="showSubcategory" @imageLoad ="imageLoad"></tab-content-category>
             </div>
         </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import TabMenu from './childComps/TabMenu.vue'
  import TabContentCategory from './childComps/TabContentCategory'
 import Scroll from 'components/common/scroll/Scroll'
import {getCategory, getSubcategory} from "network/category";
import { debonce } from "common/utils.js"

  export default {
      name: "Category",
      data(){
          return {
              categories:[],
              categoryData:[],
              currentIndex : 0,
              itemImgListener:null
          }
      },
  components:  { 
         NavBar,
        TabMenu,
        TabContentCategory,
        Scroll
    },  
	created(){
        //1.请求分类数据
        this._getCategory()
    },
    mounted(){
        const refresh = debonce(this.$refs.homeScroll.refresh, 500);
        this.itemImgListener = () => refresh();    
    },
     computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
            return this.categoryData
         }
    },
    methods:{
       
        _getCategory(){
        getCategory().then(res=>{
            //请求分类类别
            this.categories = res.data.category.list
            //console.log(this.categories);
            //for(let i = 0; i < this.categories.length; i++){
            //this.categoryData[i] = {
            //    subcategories:{}
            //     }
            // }
        //请求一个分类的数据
        this._getSubcategories(0)
        })
        
      },
        _getSubcategories(index) {
        this.currentIndex = index;
		const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData = [...res.data.list]
        //  console.log(this.categoryData);
        })
      },
         selectItem(index){
             this._getSubcategories(index)
         },

         imageLoad(){
             this.itemImgListener()
         },
        
    }
  }
</script>

<style scoped>
#category {
    height: 100vh;
  }
  .navbar{
      background-color: var(--color-tint);
      font-weight: 700;
      color: #fff;
      position: relative;
      z-index: 999;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
