<template>
  <div id="app">
    <transition name="fade">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import vheader from './components/header/header';
import valert from './components/common/alert';
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  data() {
    return {};
  },
  mounted(){
    this.getPath();
  },
  methods: {
      getPath:function()
      {
        if (this.$route.name === undefined)
        {
          this.$router.push('/menuList')
        }
      }
  },
  computed: {
    ...mapGetters([
      'showAlert'
    ])
  },
  components: {
    vheader,
    valert
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .com-app
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
