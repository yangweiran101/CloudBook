<template>
   <div class="content">
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
        bookId: ''
      }
    },
    methods: {
      getData () {
        axios.get(`/titles/${this.bookId}`).then(res => {
          this.titles = res.data
          // console.log(this.titles)
        })
      }
    },
    onLoad (options) {
      this.bookId = options.id
      this.getData()
    }
  }
</script>

<style scoped lang="less" src="@/css/catalog.less"></style>
