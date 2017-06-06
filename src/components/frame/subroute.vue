<template>
<div>
  <div id="subroute">
    <transition name="fade">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</div>
</template>

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
    };
  },
  mounted(){
  },
  methods: {
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .subroute
    position: relative
  .child-view
    position: absolute
    width: 100%
    transition: all .5s cubic-bezier(.55,0,.1,1)
    .fade-enter, .fade-leave-active
      opacity: 0
      -webkit-transform: translate(30px, 0)
      transform: translate(30px, 0)
    .fade-leave-active, .fade-enter
      opacity: 0
      -webkit-transform: translate(-30px, 0)
      transform: translate(-30px, 0)
</style>
