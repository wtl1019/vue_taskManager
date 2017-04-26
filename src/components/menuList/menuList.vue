<template>
  <div>
   <vheader></vheader>
   <div class="tab">
      <div class="tab-item">
        <router-link :to="{  name: 'taskXJ', params: { enterMenuFlg: enterMenuFlg}}">
          <img width="80" height="80">
          <span>巡检任务</span>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{  name: 'taskChk', params: { enterMenuFlg: enterMenuFlg}}">
          <img width="80" height="80">
          <span>检查任务</span>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{  name: 'taskChckComplete', params: { taskId: '002', standard: '1'}}">
          <img width="80" height="80">
          <span>任务监控</span>
        </router-link>

      </div>
   </div>
   <router-view ></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import vheader from '../header/header';
import * as _ from '../../util/tool';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  data: function () {
    return {
      enterMenuFlg:this.$route.params.enterMenuFlg,
    };
  },
  created () {
    this.$store.dispatch('changeIndexConf',{
      isBack: false,
      title: '菜单'
    });
    this.getCode();
  },
  methods: {
    getCode() {
      var str = window.location.search;
      var arr = str.replace('?','').split('&');
      this.enterMenuFlg = arr[1].split('=')[1];
      var wxCode = arr[0].split('=')[1];

      // 本地调试写死 0 领取
      // this.enterMenuFlg = '0';
      // var wxCode = 'qweqew';

      alert('wxCode: '+ wxCode);
      this.$store.dispatch('setWxCode', wxCode);
      //alert('存储的wxCode: ' + this.wxCode);
    }
  },
  computed: {
    ...mapGetters([
      'wxCode'
    ])
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
