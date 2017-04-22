<template>
  <div>
    <vheader></vheader>
    <div class="taskXJ" v-for="task in tasksXJ">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 24px;">{{task.task_id}}</span>
          <span hidden>{{task.longitude}}</span>
          <span hidden>{{task.latitude}}</span>
        </div>
        <div class="text item">
          设备编号：{{task.device_id}}
        </div>
        <div class="text item">
          安保人员：{{task.describe}}
        </div>
        <div class="text item">
          地  址：{{task.address}}
        </div>
        <div class="text item">
          执行状态：{{task.status=="1"?"完成":"进行"}}
          <span v-show="task.status==1"  @click="selectTask(task)">(查看轨迹)</span>
        </div>
      </el-card>
    </div>
    <pathRouter :task="selectedTask" ref="pathRouter"></pathRouter>
  </div>
</template>

<script>
import vheader from '../header/header';
import condition from '../condition';
import pathRouter from '../map/pathRouter';
import { mapGetters } from 'vuex';

export default {
  data: function () {
    return {
      tasksXJ: [],
      selectedTask: {}
    };
  },
  created () {
    this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '任务监控'
    });
    alert(this.wxCode);
    this.getToken(this.wxCode);
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
      let url = this.apiUrl + 'devices/2/list/01/completed?token=' + this.token;
      this.$http.get(url).then((response) => {
        if (response.data.respCode === "0000") {
          alert(1);
          this.tasksXJ = response.data.data;
        }
      },(response) => {
        alert(2);
        alert(response.data.respCode);
        alert('处理失败');
      });
    },
    selectTask(task) {
      this.selectedTask = task;
      this.$refs.pathRouter.show(task);
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
  .taskXJ
    z-index:10
    .box-card
      width:95%;
      margin:10px auto
      .text
        font-size: 14px
      .item
        padding: 12px 0
        span
          display:inline-block
          padding:0 5px
          color:red
      .clearfix:before,.clearfix:after
        display: table
        content:""
      .clearfix:after
        clear:both
</style>
