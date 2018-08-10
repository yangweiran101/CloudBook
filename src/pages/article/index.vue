<template>
<div class="content">
  <div class="article" v-if="article.title" :style="{fontSize:fontSize + 'rpx'}">
    <div>{{article.title}}</div>
    <wemark
      :md="article.article.content"
      link
      :highlight="true"
      type="wemark"
    ></wemark>
  </div>
  <div class="catalog" v-if="isShow">
    <a :href="'/pages/article/main?id='+item._id +'&catalogId='+ catalogId "
       v-for="(item, val) in titles"
       :key="val"
       @click="close()"
       class="title">
      {{item.title}}
    </a>
  </div>
  <div class="blank" @click="close()" v-if="isShow">

  </div>
  <div class="setting">
    <div class="button">
      <div class="iconfont icon-houtui1" @click="getLast()"></div>
    </div>
    <div class="button">
      <div class="iconfont icon-mulu" @click="open()"></div>
    </div>
    <div class="button">
      <div class="iconfont icon-yueduye_zitizengda" @click="addFont()"></div>
    </div>
    <div class="button">
      <div class="iconfont icon-yueduye_zitijianxiao" @click="reduceFont()"></div>
    </div>
    <div class="button">
      <div class="iconfont icon-qianjin" @click="getNext()"></div>
    </div>
  </div>
</div>
</template>

<script>
  import {axios} from '../../utils/index'
  export default {
    data () {
      return {
        titles: [],
        article: {},
        articleId: '',
        catalogId: '',
        fontSize: 40,
        index: null,
        isShow: false
      }
    },
    methods: {
      getData () {
        axios.get(`/article/${this.articleId}`).then(res => {
          this.article = res.data
        })
      },
      getLast () {
        if (this.index === 0) {
          wx.showModal({
            title: '前面没有了'
          })
        } else {
          this.index = this.index - 1
          this.titles.forEach(item => {
            if (item.index === this.index) {
              this.articleId = item._id
              // console.log(this.articleId)
            }
          })
          this.getData()
        }
      },
      getNext () {
        if (this.index >= this.titles.length - 1) {
          wx.showModal({
            title: '后面没有了'
          })
        } else {
          this.index = this.index + 1
          this.titles.forEach(item => {
            if (item.index === this.index) {
              this.articleId = item._id
              // console.log(this.articleId)
            }
          })
          this.getData()
        }
      },
      getCatalog () {
        axios.get(`/titles/${this.catalogId}`).then(res => {
          this.titles = res.data
          this.titles.forEach(item => {
            if (item._id === this.articleId) {
              this.index = item.index
            }
          })
        })
      },
      close () {
        this.isShow = false
      },
      open () {
        this.isShow = true
      },
      addFont () {
        if (this.fontSize >= 130) {
          wx.showModal({
            title: '字体过大影响阅读哦'
          })
        } else {
          this.fontSize = this.fontSize + 4
        }
      },
      reduceFont () {
        if (this.fontSize <= 24) {
          wx.showModal({
            title: '字体太小会损坏眼睛哦'
          })
        } else {
          this.fontSize = this.fontSize - 4
        }
      }
    },
    onLoad (options) {
      this.catalogId = options.catalogId
      this.articleId = options.id
      this.getData()
      this.getCatalog()
    },
    onShareAppMessage (val) {
      return {
        title: this.article.title,
        path: '/pages/counter/main',
        imageUrl: this.article.img
      }
    }
  }
</script>

<style scoped lang="less" src="@/css/article.less">
</style>
