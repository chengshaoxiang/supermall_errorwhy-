<template>
  <div>
      <div class="item" v-for="(item, index) in subcategories" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="" @load ="imageLoad">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
  </div>
</template>

<script>

  export default {
    name: "TabContentCategory",
    components: {
      
    },
    props: {
      subcategories:Array
    },
    methods:{
        imageLoad(){
            this.$emit('imageLoad')
        }
    }
  }
</script>

<style scoped>
  .item {
    /*text-align: center;*/
    font-size: 12px;
    /*overflow: hidden;*/
    display: inline-block;
    width: 33%;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
