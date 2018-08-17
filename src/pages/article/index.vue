<template>
<div class="content">
  <div class="loading" v-if="isLoading">
    <img src="/static/img/loading.svg">
  </div>
  <div class="container" v-if="!isLoading">
    <div class="article" v-if="article.title" :style="{fontSize:fontSize + 'rpx'}">
      <div>{{article.title}}</div>
      <!--md文本插件-->
      <wemark
        :md="article.article.content"
        link
        :highlight="true"
        type="rich-text"
      ></wemark>
    </div>
    <!--目录-->
    <scroll-view
      scroll-y="true"
      class="catalog"
      :style="{transform: 'translateX(' + trans + ')'}">
      <div v-for="(item, val) in titles" :key="val" @click="getNewArticle(item._id)" class="title">
        {{item.title}}
      </div>
    </scroll-view>
    <div class="blank" @click="close()" v-if="isShow"></div>
    <!--设置按钮-->
    <movable-area class="setting-btn">
      <movable-view
        @click="getSetting()"
        class="iconfont icon-jiahao"
        direction="all"
        out-of-bounds="true"
        inertia="true"
        friction="1">
      </movable-view>
    </movable-area>
    <div class="setting" v-if="isSet">
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
        index: 0,
        trans: '-600rpx',
        isShow: false,
        isSet: false,
        isLoading: true
      }
    },
    methods: {
      // 获取文章详情
      getData () {
        axios.get(`/article/${this.articleId}`).then(res => {
          this.article = res.data
          this.isLoading = false
          // console.log(this.article)
        })
      },
      // 获取新文章
      getNewArticle (id) {
        this.articleId = id
        this.isShow = false
        this.article = {}
        this.getData()
        this.close()
      },
      // 获取上一章的内容
      getLast () {
        if (this.index === 0) { // 如果是首个章节的话，进行提示
          wx.showToast({
            title: '前面没有了'
          })
        } else {
          this.isLoading = true
          this.index = this.index - 1
          this.articleId = this.titles[this.index]._id
          this.getData()
        }
      },
      // 获取下一章内容
      getNext () {
        if (this.index >= this.titles.length - 1) { // 如果是末尾章节的话，进行提示
          wx.showToast({ // 弹框提示
            title: '后面没有了'
          })
        } else {
          this.isLoading = true
          this.index = this.index + 1 // 索引数加一
          this.articleId = this.titles[this.index]._id
          this.getData()
        }
      },
      // 获取目录
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
      // 关闭目录
      close () {
        this.isShow = false
        this.trans = '-600rpx'
      },
      // 打开目录
      open () {
        this.isShow = true
        this.trans = 0
      },
      // 增大字体
      addFont () {
        if (this.fontSize >= 130) { // 如果字体过大，进行提示
          wx.showToast({
            title: '字体过大影响阅读哦'
          })
        } else {
          this.fontSize = this.fontSize + 4
        }
      },
      // 减小字体
      reduceFont () {
        if (this.fontSize <= 24) {
          wx.showToast({
            title: '字体太小会损坏眼睛哦'
          })
        } else {
          this.fontSize = this.fontSize - 4
        }
      },
      getSetting () {
        this.isSet = !this.isSet
      }
    },
    created () {
      this.article = {}
      this.isLoading = false
    },
    // 获取查询字符串参数
    onLoad (options) {
      // console.log(options)
      this.catalogId = options.catalogId
      this.articleId = options.id
      this.getData()
      this.getCatalog()
    },
    // 分享操作
    onShareAppMessage (val) {
      return {
        title: this.article.title,
        path: '/pages/counter/main',
        imageUrl: this.article.img
      }
    }
  }
</script>

<style scoped lang="less" src="../../css/article.less">
</style>
