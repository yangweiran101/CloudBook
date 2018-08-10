<script>
export default {
  created () {
  }
}
</script>

<style>
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
  position: relative;
}
  .fleft{
    float: left;
  }
  .fright{
    float: right;
  }
  .mleft{
    margin-left: 10rpx;
  }
.clearfix::after {
  content: '';
  visibility: hidden;
  display: block;
  clear: both;
}
</style>
