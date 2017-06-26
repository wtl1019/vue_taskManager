<template>
  <div class="wrapper">
    <div class="block">
      <div class="block-title">巡检任务</div>
      <div class="content">
        <router-link :to="{  name: 'taskXJ', query: { enterMenuFlg: '0'}}">
          <div class="little-block">
            <img src="./pic2.png" alt="" class="l-img">
            <div class="msg">领取任务</div>
          </div>
        </router-link>
        <router-link :to="{  path: '/menuList/taskXJ', query: { enterMenuFlg: '1'}}">
          <div class="little-block">
            <img src="./pic3.png" alt="" class="l-img">
            <div class="msg">执行任务</div>
          </div>
        </router-link>
        <router-link to="/taskMonitor">
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
    <router-view></router-view>
</div>
</template>

<script>
import vheader from '../header/header';
import * as _ from '../../util/tool';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import api from '../../fetch/api';

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
    //this.getToken();
  },
  methods: {
    getToken() {
      this.$store.dispatch('setLoadingState', true);
      //生产
      let tokenUrl = 'auth/token?code=wangtianli';

      api.fetchToken(tokenUrl).then(res => {
          if (res.data.respCode == "0000") {
            this.$store.dispatch('setToken', response.data.data);
            this.$store.dispatch('setLoadingState', false);
          }
          else {
            alert('token返回错误:' + response.data.respMsg);
            this.$store.dispatch('setLoadingState', false);
        }
        })
        .catch(error => {
          this.$store.dispatch('setLoadingState', false);
          console.log(error);
        })
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
.router-slid-enter-active, .router-slid-leave-active {
  transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>
