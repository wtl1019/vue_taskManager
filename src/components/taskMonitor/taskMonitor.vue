<template>
  <div>
    <el-card class="box-card" v-show="noData">
        <div class="text item">
          {{messge}}
        </div>
    </el-card>
    <div class="taskMoniter" v-for="task in tasksXJ">
      <div class="taskContent">
        <div class="common taskId">
          <span>{{task.task_id}}</span>
        </div>
        <div class="common detail">
          <span class="devId">设备编号：{{task.device_id}}</span>
          <span class="excState">执行状态：{{task.status=="1"?"完成":"进行"}}</span>
        </div>
        <div class="common router">
          <span  v-show="task.status==1"  @click="selectTask(task)">(查看轨迹)</span>
        </div>
      </div>
    </div>
    <!--<div class="taskXJ" v-for="task in tasksXJ">
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
          执行状态：{{task.status=="1"?"完成":"进行"}}
          <span v-show="task.status==1"  @click="selectTask(task)">(查看轨迹)</span>
        </div>
      </el-card>
    </div>-->
    <pathRouter :task="selectedTask" ref="pathRouter"></pathRouter>
  </div>
</template>

<script>
import vheader from '../header/header';
import condition from '../condition';
import pathRouter from '../map/pathRouter';
import { mapGetters } from 'vuex';
import * as _ from '../../util/tool';

export default {
  data: function () {
    return {
      noData: false,
      messge: '',
      tasksXJ: [],
      selectedTask: {}
    };
  },
  created () {
    /*this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '任务监控'
    });*/
    document.title = '任务监控';
    //不用传送微信code的方式，后端在调用该路径时会将token值跟在后面
    this.getTasks();
  },
  methods: {
    getTasks() {
      // 获取待领取/待执行任务列表
      let url = this.apiUrl + 'tasks/list/01/completed?token=' + this.token;
      this.$store.dispatch('setLoadingState', true);

      this.$http.get(url).then((response) => {
        if (response.data.respCode === "0000") {
          if(response.data.data.length > 0) {
            this.tasksXJ = response.data.data;
          }
          else {
            this.messge = '当前没数据';
            this.noData = true;
          }
          this.$store.dispatch('setLoadingState', false);
        }
      },(response) => {
        //alert(response.data.respCode);
        this.$store.dispatch('setLoadingState', false);
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
  .taskMoniter
    padding: 0.4rem 0.4rem 0 0.4rem
    .taskContent
      box-shadow:0 0 10px 10px #f1eeee
      border-radius:10px
      background: #7ADAF3
      position:relative
      margin:15px
      padding:20px 15px
      .common
        display:inline-block
        height:30px
        line-height:30px
      .taskId
        width:50px
        height:50px
        margin-left:15px
        background-color:#fff
        border-radius:25px
        position:relative
        right:10px
        bottom:10px
        span
          display:block
          height:50px
          line-height:50px
          text-align:center
          color:#7ADAF3
          font-weight:700
          font-size:25px
      .detail
        .devId
          margin-top:10px
        span
          display:block
          color:#fff
      .router
        position:relative
        left:15px
        bottom:10px
        color:red
/*  .taskXJ
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
        clear:both*/
</style>
