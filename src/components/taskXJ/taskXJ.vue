<template>
  <div>
    <vheader></vheader>
    <div class="taskXJ" v-for="item in tasksXJ">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 24px;">{{item.task_id}}</span>
          <span hidden>{{item.longitude}}</span>
          <span hidden>{{item.latitude}}</span>
        </div>
        <div class="text item">
          设备编号：{{item.device_id}}
        </div>
        <div class="text item">
          责任人：{{item.describe}}
        </div>
        <div class="text item">
          地  址：{{item.address}}
        </div>
        <div class="clearfix">
          <el-button v-show="btnGet" style="float: right; margin-left:20px;" type="primary" @click="reciveTask(item,'0')">领取</el-button>
          <el-button v-show="btnExcute" style="float: right;" type="primary" @click="excuteTask(item)">执行</el-button>
          <el-button v-show="btnExcute" style="float: right;" type="primary" @click="refuseReson(item,'1')">拒绝</el-button>
          <el-button v-show="btnExcute" style="float: right;" type="primary" @click="path(item)">路线</el-button>
        </div>
      </el-card>
    </div>
    <!--<dingwei :task="selectedTask" ref="dingwei"></dingwei>-->
  </div>
</template>

<script>
import vheader from '../header/header';
import condition from '../condition';
import router from '../../router';
import navigation from '../map/navigation';
import dingwei from '../map/dingwei';
import { XDialog, XTextarea, XButton, Box, GroupTitle, Group, Flexbox, FlexboxItem, Divider } from 'vux';
import { mapGetters } from 'vuex';
import bus from '../../common/js/bus.js';

export default {
  data: function () {
    return {
      btnGet: '',
      btnExcute: '',
      textFlg: '',
      tasksXJ: [],
      dialogVisible: false,
      selectedTask:{}
    };
  },
  created () {
    this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '巡检任务'
    });

    /*this.$store.dispatch('getToken',this.wxCode);
    if(this.token)
    {
       this.getTasks();
    }*/
    //this.getToken(this.wxCode);
    let wxCode='wwwwwww';
    this.getToken(wxCode);
  },
  methods: {
    getToken(wxCode) {
      let tokenUrl = this.apiUrl + 'auth/token?code='+ wxCode;
      alert('taskXJ//tokenUrl : '+tokenUrl);
      this.$http({
        method: 'GET',
        url: tokenUrl,
        data: {}
      }).then((response) => {
        if (response.data.respCode === "0000") {
          this.$store.dispatch('setToken', response.data.data);
          this.getTasks();
        }
        else {
          alert('token返回错误:' + response.data.respMsg);
        }
      }, (response) => {
        alert('处理失败');
      })
    },
    getTasks() {
      // 获取待领取/待执行任务列表
      let url = this.apiUrl + 'devices/2/list/01/nexec?token=' + this.token;
      this.$http.get(url).then((response) => {
        if (response.data.respCode === "0000") {
          this.tasksXJ = response.data.data;
        }
      },(response) => {
        alert('处理失败');
      });
      if (this.$route.params.taskTypFlg == '1') {
        alert(1);
        this.btnExcute = true;
        this.btnGet = false;
      } else {
        alert(2);
        this.btnGet = true; // 领取
        this.btnExcute = false;
      }
    },
    // 点击执行，显示提示框，用户确认是否进入地图进行导航
    excuteTask (item) {
      // let taskId = item.task_id;
      // bus.$emit('id-selected', taskId);
      // router.push('dingwei');
      this.$router.push({ name: 'dingwei', params: { taskId: item.task_id, lon: item.longitude, lat: item.latitude}});
    },
    // stata=0 领取任务。发送后台标识即可
    reciveTask (item,stata) {
      let reciveuUrl = this.apiUrl + 'tasks/get?token=' + this.token;
      this.$http.post(reciveuUrl, {task_id:item.task_id})
      .then((response) => {
        if (response.data.respCode === "0000") {
          this.getTasks(); // 重新刷新列表
        }
      }, (response) => {
        alert(response.data.respCode);
        alert(response.data.respMsg);
        alert('处理失败');
      });
    },
    refuseReson () {
      this.$prompt('请输入拒绝原因:', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'msgBoxSize',
          inputPattern: /^[.\n]+$/,
          inputErrorMessage: '原因不能为空'
        }).then(({ value }) => {
          this.$http({
            method:'GET',
            url:'http://115.171.70.99:9089/',
            data:{
              taskId:item.taskId,
              userId:item.userId,
              deviceNo:item.deviceNo,
              state:'1',
              orgnization:item.orgnization,
              refuseReson:value
            }
          }).then((response) => {
            if (response.data.respCode === "0000") {
              alert(response.data.respMsg);
              this.getTasks(); // 重新刷新列表
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
    },
    // stata=1 拒绝执行任务。发送后台标识即可
    refuseTask (item,stata) {
    },
    path(item) {
      /*this.$store.dispatch('setAddress', {
        name: item.address,
        lat: item.latitude,
        lon:item.longitude
      });
      router.push('navigation');*/
      this.$router.push({ name: 'navigation', params: { name: item.address, lon:item.longitude, lat: item.latitude }});
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
    condition,
    navigation,
    dingwei,
    vheader,
    XDialog,
    XButton,
    XTextarea,
    Box,
    GroupTitle,
    Group,
    Flexbox,
    FlexboxItem,
    Divider
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .taskXJ
    z-index:-1
    .box-card
      width: 95%;
      margin:10px auto
      .text
        font-size: 14px
      .item
        padding: 12px 0;
      .clearfix:before,.clearfix:after
        display: table
        content:""
      .clearfix:after
        clear:both
  .msgBoxSize
    width:90%
</style>
