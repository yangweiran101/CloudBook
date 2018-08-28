<template>
    <div class="content">
      <div class="loading" v-if="isLoading">
        <img src="/static/img/loading1.svg">
      </div>
      <div class="box" v-if="!isLoading">
        <div class="book" v-for="(item,key) in category" :key="key" @click="gotoCategory(item._id)">
          <img :src="item.icon">
          <div class="title">{{item.title}}</div>
        </div>
      </div>
    </div>
</template>

<script>
  import {axios} from '../../utils/index'
  export default {
    data () {
      return {
        category: [],
        isLoading: true
      }
    },
    methods: {
      getCategory () {
        this.isLoading = true
        axios.get('/category').then(res => {
          this.category = res.data
          this.isLoading = false
        })
      },
      gotoCategory (id) {
        wx.navigateTo({
          url: `/pages/books/main?id=${id}`
        })
      }
    },
    onShow () {
      this.isLoading = true
    },
    created () {
      this.getCategory()
    }
  }
</script>

<style scoped lang="less" src='../../css/library.less'>
</style>
