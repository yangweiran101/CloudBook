<template>
  <div class="content">
    <div class="box">
      <div class="book" v-for="(item,index) in collect" :key="index">
        <img :src="item.book.img">
        <div class="title">{{item.book.title}}</div>
      </div>
    </div>
    <div class="tips" v-if="isDone">--------没有更多了--------</div>
    <div class="tips" v-if="!isDone">--------下拉加载更多--------</div>
  </div>

</template>

<script>
  import {axios} from '../../utils/index'
  export default {
    data () {
      return {
        collect: [],
        pn: 1,
        isLoading: true,
        isDone: false
      }
    },
    methods: {
      getCollect () {
        axios.get('/collection', {pn: this.pn, size: 6}).then(res => {
          if (res.data.length === 0) {
            this.isLoading = false
          } else if (res.data.length <= 6) {
            this.isDone = true
            this.collect = this.collect.concat(res.data)
          } else {
            this.isDone = false
            this.collect = this.collect.concat(res.data)
          }
        })
      }
    },
    onReachBottom () {
      if (this.isLoading) {
        this.pn = this.pn + 1
        this.getCollect()
      }
    },
    onShow () {
      this.getCollect()
    },
    onUnload () {
      this.collect = []
      this.pn = 1
      this.isLoading = true
    }
  }
</script>

<style scoped lang="less" src='../../css/collect.less'>
</style>
