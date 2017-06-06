<template>
  <div class="taskQry">
    <div class="header-icon" v-show="menuDisplay" @click="showBar">
      <span>筛选</span>
      <i class="el-icon-menu"></i>
    </div>
  </div>
</template>

<script>
import vheader from '../header/header';
import condition from '../condition';
import pathRouter from '../map/pathRouter';
import * as _ from '../../util/tool';
import { mapGetters, mapActions } from 'vuex';

export default {
  data: function () {
    return {
      noData: false,
      messge: '',
      menuDisplay: true,
      backDisplay: true
    };
  },
  created () {
    /*this.$store.dispatch('changeIndexConf',{
      isBack: false,
      title: '任务统计'
    });*/
    document.title = '任务统计';
    //不用传送微信code的方式，后端在调用该路径时会将token值跟在后面
    this.getToken();
  },
  methods: {
    getToken() {
      //生产
      var str = window.location.search;
      var arr = str.replace('?','').split('&');
      var token = arr[0].split('=')[1];
      // alert('token: '+ token);
      this.$store.dispatch('setToken', token);

      // 测试
      // var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAxIiwiaXNzIjoiaHR0cDpcL1wvbG9jYWxob3N0XC9zbWFydF9zZWN1cml0eVwvcHVibGljXC9pbmRleC5waHBcL2FwaVwvYXV0aFwvdG9rZW4iLCJpYXQiOjE0OTMzNDY5OTAsImV4cCI6MTQ5MzQwNjk5MCwibmJmIjoxNDkzMzQ2OTkwLCJqdGkiOiI1ZGJhOTA4NDM4MTg1YTcyYzZmMGNmMTg1Nzk5ODI2OCJ9.oLRZEqQPSJOn-tIK2EXDv98WwhrKJ15JBefkAHq7bvM';
      // alert('token: '+ token);

      this.$store.dispatch('setToken', token);
    },
    selectTask(task) {
      this.selectedTask = task;
      this.$refs.pathRouter.show(task);
    },
    showBar () {
      this.$store.dispatch('setNavState', true)
    }
  },
  computed: {
    ...mapGetters([
      'taskTypFlg',
      'apiUrl',
      'wxCode',
      'token'
    ])
  },
  components: {
    condition,
    pathRouter,
    vheader
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.taskQry
  position: fixed
  transform: translateZ(0)
  top: 58px
  z-index: 4
  height: 58px
  width: 100%
  background: #ccc
  display: flex
  flex-direction: row
  .header-icon
    flex:1
    text-align: right
    padding-right:20px
    padding-top:20px
    >i
      line-height: 20px
  .header-cont
    flex: 6;
    padding-left: 40px
</style>
