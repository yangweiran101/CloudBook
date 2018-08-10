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
       @click="come()"
       class="title">
      {{item.title}}
    </a>
  </div>
  <div class="blank" @click="back()" v-if="isShow">

  </div>
  <div class="setting">
    <div class="button">
      <div class="iconfont icon-mulu" @click="getCatalog()"></div>
    </div>
    <div class="button">
      <div class="iconfont icon-yueduye_zitizengda" @click="addFont()"></div>
    </div>
    <div class="button">
      <div class="iconfont icon-yueduye_zitijianxiao" @click="reduceFont()"></div>
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
        isShow: false
      }
    },
    methods: {
      getData () {
        axios.get(`/article/${this.articleId}`).then(res => {
          console.log(this.articleId)
          this.article = res.data
        })
      },
      getCatalog () {
        axios.get(`/titles/${this.catalogId}`).then(res => {
          this.titles = res.data
          this.isShow = true
        })
      },
      back () {
        this.isShow = false
      },
      come () {
        this.isShow = false
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
      console.log(options)
      this.catalogId = options.catalogId
      this.articleId = options.id
      this.getData()
      // this.getCatalog()
    },
    onShareAppMessage (val) {
      // console.log(val)
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
