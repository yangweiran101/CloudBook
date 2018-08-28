<template>
  <div class="content">
    <div class="box">
      <div class="book-list" v-for="(obj,e) in Books" :key="e" @click="gotoBook(obj._id)">
        <img :src="obj.img" class="image">
        <div class="list-right">
          <div class="list-title">
            {{obj.title}}
          </div>
          <div class="list-content">
            {{obj.desc}}
          </div>
          <div class="list-detail">
            <span class="detail-author fleft">{{obj.author}}</span>
            <span class="detail-eye fright mleft">{{obj.looknums}}人在看</span>
            <span class="detail-style fright mleft">{{title}}</span>
            <span class="detail-time fright mleft">两天前</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {axios} from '../../utils/index'
  export default {
    data () {
      return {
        Books: [],
        title: '',
        id: '',
        pn: 1,
        isLoad: true
      }
    },
    methods: {
      getBooks () {
        axios.get(`/category/${this.id}/books`, {pn: this.pn, size: 4}).then(res => {
          this.title = res.title
          console.log(res)
          if (res.data.length === 0) {
            this.isLoad = false
          } else {
            this.Books = [...this.Books, ...res.data.books]
          }
        })
      },
      gotoBook (id) {
        wx.navigateTo({
          url: `/pages/counter/main?id=${id}`
        })
      }
    },
    onReachBottom () {
      if (this.isLoad) {
        this.pn = this.pn + 1
        this.getBooks()
      }
    },
    onLoad (e) {
      this.id = e.id
      this.getBooks()
    },
    onUnload () {
      this.Books = {}
      this.pn = 1
      this.isLoad = true
    }
  }
</script>

<style scoped lang="less" src='../../css/books.less'>
</style>
