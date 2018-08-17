<template>
  <div class="box">
    <div class="book">
      <img src="/static/img/shouye.png">
    </div>
  </div>
</template>

<script>
  import {axios} from '../../utils/index'
  export default {
    data () {
      return {
        collect: []
      }
    },
    methods: {
      getCollect () {
        axios.get()
      }
    }
  }
</script>

<style scoped>

</style>
