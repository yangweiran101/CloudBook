<template>
   <div class="content">
     <div class="loading" v-if="isLoading">
       <img src="/static/img/loading1.svg">
     </div>
     <a :href="'/pages/article/main?id='+item._id +'&catalogId='+ bookId "
        v-for="(item, val) in titles"
        :key="val"
        v-if="!isLoading"
        class="title">
     {{item.title}}
   </a>
   </div>
</template>

<script>
  import {axios} from '../../utils/index'
  export default {
    data () {
      return {
        titles: [],
        bookId: '',
        isLoading: true
      }
    },
    methods: {
      getData () {
        this.isLoading = true
        axios.get(`/titles/${this.bookId}`).then(res => {
          this.titles = res.data
          this.isLoading = false
        })
      }
    },
    onLoad (options) {
      this.bookId = options.id
      this.getData()
      this.titles = []
    }
  }
</script>

<style scoped lang="less" src="../../css/catalog.less"></style>
