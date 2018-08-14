<template>
   <div class="content">
     <div class="loading" v-if="isLoading">
       <img src="/static/img/loading.svg">
     </div>
     <a :href="'/pages/article/main?id='+item._id +'&catalogId='+ bookId "
            v-for="(item, val) in titles"
            :key="val"
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
        axios.get(`/titles/${this.bookId}`).then(res => {
          this.titles = res.data
          this.isLoading = false
          // console.log(this.titles)
        })
      }
    },
    created () {
      this.titles = []
      this.isLoading = true
    },
    onLoad (options) {
      this.bookId = options.id
      this.getData()
    }
  }
</script>

<style scoped lang="less" src="@/css/catalog.less"></style>
