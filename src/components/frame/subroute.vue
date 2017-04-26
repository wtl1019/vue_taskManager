<template>
  <div id="subroute">
    <transition name="fade">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import vheader from '../header/header';
import valert from '../common/alert';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'showAlert',
      'wxCode'
    ])
  },
  components: {
    vheader,
    valert
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
