<template>
  <div id="app">
    <vtoast v-show="showToast"></vtoast>
    <valert v-show="showAlert"></valert>
    <vloading v-show="loading"></vloading>

    <!--<vheader></vheader>-->
    <transition name="fade">
      <router-view class="child-view"></router-view>
    </transition>
    <vcondition></vcondition>
  </div>
</template>

<script type="text/ecmascript-6">
import vheader from './components/header/header';
import vcondition from './components/condition';
import valert from './components/common/alert';
import vtoast from './components/common/toast';
import vloading from './components/common/loading';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
    ...mapGetters([
      'showAlert',
      'wxCode',
      'loading',
      'showToast',
      'showAlert'
    ])
  },
  components: {
    vheader,
    vcondition,
    valert,
    vtoast,
    vloading
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
