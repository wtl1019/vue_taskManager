<template>
  <div class="wrapper">
  <div class="block">
    <div class="block-title">巡检任务</div>
    <div class="content">
      <router-link :to="{  name: 'taskXJ', params: { enterMenuFlg: '0'}}">
        <div class="little-block">
          <img src="./pic2.png" alt="" class="l-img">
          <div class="msg">领取任务</div>
        </div>
      </router-link>
      <router-link :to="{  name: 'taskXJ', params: { enterMenuFlg: '1'}}">
        <div class="little-block">
          <img src="./pic3.png" alt="" class="l-img">
          <div class="msg">执行任务</div>
        </div>
      </router-link>
      <router-link :to="{  name: 'taskMonitor'}">
        <div class="little-block">
          <img src="./pic1.png" alt="" class="l-img">
          <div class="msg">轨迹查看</div>
        </div>
      </router-link>
    </div>
  </div>
  <div class="block">
    <div class="block-title">检查任务</div>
    <div class="content">
      <router-link :to="{  name: 'taskChk'}">
        <div class="little-block">
          <img src="./pic3.png" alt="" class="l-img">
          <div class="msg">执行任务</div>
        </div>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import vheader from '../header/header';
import * as _ from '../../util/tool';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  data: function () {
    return {
      enterMenuFlg: '',
    };
  },
  created () {
    /*this.$store.dispatch('changeIndexConf',{
      isBack: false,
      title: '菜单'
    });*/
    document.title = '菜单';
    this.getToken();
  },
  methods: {
    /*getCode() {
      var str = window.location.search;
      var arr = str.replace('?','').split('&');
      this.enterMenuFlg = arr[1].split('=')[1];
      var wxCode = arr[0].split('=')[1];

      // 本地调试写死 0 领取 1 执行
      //this.enterMenuFlg = '0';
      var wxCode = 'qweqew';

      // alert('enterMenuFlg:'+this.enterMenuFlg);
      //alert('wxCode: '+ wxCode);
      this.$store.dispatch('setWxCode', wxCode);
      //alert('存储的wxCode: ' + this.wxCode);
    },*/
    getToken() {
      //生产
      var str = window.location.search;
      var arr = str.replace('?','').split('&');
      //this.enterMenuFlg = arr[0].split('=')[1];
      //alert('enterMenuFlg:'+this.enterMenuFlg);
      var token = arr[0].split('=')[1];
      //alert('token: '+ token);
      this.$store.dispatch('setToken', token);
      //alert('存储的token:'+this.token);
      //this.loadwxConfig();
    },
    loadwxConfig() {
      let vm = this;
      //let serviceUrl= 'http://ipqc.seuic.info/basic/web/dist_anbao/index.html?menuFlg=1#/menuList';
      //let pageUrl = encodeURIComponent(serviceUrl);
      let pageUrl = encodeURIComponent(document.URL.split('#')[0]);
      let loadWXCofigurl= vm.apiUrl + 'wx/jssdk_sign/2'+'?token=' + vm.token+'&page='+pageUrl;
      //alert('loadWXCofigurl:'+loadWXCofigurl);
      vm.$store.dispatch('FETCH_WX_CONFIG',loadWXCofigurl);
    }
  },
  computed: {
    ...mapGetters([
      'apiUrl',
      'wxCode',
      'token'
    ])
  },
  components: {
    vheader
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.wrapper {
  background: #f4f6f5;
}
.block {
  padding: 15px 15px 0 15px;
}
.block-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
}
.content {
  box-shadow:0 0 10px 10px #f1eeee;
  background: #ffffff;
}
.content:after {
  content: '';
  clear: both;
  display: block;
}
.little-block {
  padding: 15px 0;
  box-sizing: border-box;
  width: 33.333%;
  text-align: center;
  float: left;
}
.l-img {
  height: 50px;
  width: 50px;
}
.msg {
  margin-top: 10px;
}
</style>
