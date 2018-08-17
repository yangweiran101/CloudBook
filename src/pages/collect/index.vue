<template>
  <div class="box">
    <div class="book" v-for="(item,index) in collect" :key="index">
      <img :src="item.book.img">
      <div class="title">{{item.book.title}}</div>
    </div>
  </div>
</template>

<script>
  import {axios} from '../../utils/index'
  export default {
    data () {
      return {
        collect: [],
        pn: 1
      }
    },
    methods: {
      getCollect () {
        axios.get('/collection', {pn: this.pn, size: 12}).then(res => {
          // console.log(res)
          this.collect = res.data
          console.log(this.collect)
        })
      }
    },
    onShow () {
      this.getCollect()
    }
  }
</script>

<style scoped lang="less" src='../../css/collect.less'>
</style>
