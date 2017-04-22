<template>
  <div>
   <vheader></vheader>
   <div class="tab">
      <div class="tab-item">
        <router-link v-bind:to="taskXJ">
          <img width="80" height="80">
          <span>巡检任务</span>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link v-bind:to="taskChk">
          <img width="80" height="80">
          <span>检查任务</span>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/taskMonitor">
          <img width="80" height="80">
          <span>任务监控</span>
        </router-link>
      </div>
   </div>
  </div>
</template>

<script type="text/ecmascript-6">
import vheader from '../header/header';
import * as _ from '../../util/tool';
import { mapActions } from 'vuex';

export default {
  data: function () {
    return {
      taskTypFlg:'',
      taskXJ: '',
      taskChk: ''
    };
  },
  created () {
    this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '菜单'
    });
    this.getCode();
  },
  methods: {
    getCode() {
      var str = window.location.search;
      var arr = str.replace('?','').split('&');
      this.taskTypFlg = arr[1].split('=')[1];
      this.taskXJ = '/taskXJ/'+this.taskTypFlg;
      this.taskChk = '/taskChk/'+this.taskTypFlg;

      var wxCode = arr[0].split('=')[1];
      // alert('wxCode: '+ wxCode);
      this.$store.dispatch('setWxCode', wxCode);
      // alert('存储的wxCode: ' + this.wxCode);
    }
  },
  components: {
    vheader
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tab
    display: flex
    width: 100%
    height: 180px
    .tab-item
      flex: 1
      img
        display: block
        margin: 30px auto 5px auto
      span
        display: block
        text-align: center
</style>
