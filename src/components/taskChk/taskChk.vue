<template>
  <div>
    <el-card class="box-card" v-show="noData">
        <div class="text item">
          {{messge}}
        </div>
    </el-card>
    <div class="taskCheck" v-for="item in tasksCheck">
      <div class="content">
        <div class="task-Title">{{item.describe}}</div>
        <div class="taskContent">
          <div calss="taskId">任务号：{{item.task_id}}</div>
          <div class="data">
            <span class="data-color">开始时间</span>
            <span>{{item.start_time}}</span>
          </div>
          <div class="data">
            <span class="data-color">结束时间</span>
            <span class="data-address">{{item.end_time}}</span>
          </div>
        </div>
        <div class="btn">
          <div class="btn-common refuseBtn" @click="excuteTask(item.task_id)">执 行</div>
        </div>
      </div>
    </div>
    <!--<div class="taskXJ" v-for="(item,index) in tasksCheck">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 24px;">{{item.task_id}}</span>
        </div>
        <div class="text item">
          任务描述：{{item.describe}}
        </div>
        <div class="text item">
          开始时间：{{item.start_time}}
        </div>
        <div class="text item">
          结束时间：{{item.end_time}}
        </div>
        <div class="clearfix">
          <el-button style="float: right;" type="primary" @click="excuteTask(item.task_id)">执行</el-button>
        </div>
      </el-card>
    </div>-->
    <transition name="fade">
        <div class="dialog" v-if="showDialog">
          <div class="submit-dialog" v-if="submitError">
            <header>
              <span>提示</span>
              <span class="close-btn" @click="showDialog = false">X</span>
            </header>
            <p>{{info}}</p>
            <div class="btn-box">
              <button class="yes" @click="showDialog = false">确定</button>
              <button @click="showDialog = false">取消</button>
            </div>
          </div>
          <div class="submit-dialog" v-else>
            <header>
              <span>提示</span>
              <span class="close-btn" @click="showDialog = false">X</span>
            </header>
            <p>{{info}}</p>
          </div>
        </div>
    </transition>
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
import api from '../../fetch/api';

export default {
  data: function () {
    return {
      noData: false,
      messge: '',
      textFlg: '',
      tasksCheck: [],
      dialogVisible: false,
      showDialog: false,
      submitError: false,
      selectedTask:{}
    };
  },
  created () {
    /*this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '检查任务'
    });*/
    document.title = '检查任务-待执行';
    this.getTasks();
  },
  methods: {
    /*getToken() {
      let tokenUrl = this.apiUrl + 'auth/token?code=asadasd';
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
    },*/
    getTasks() {
      let vm = this;
      // 获取待领取检查任务列表
      let url = 'tasks/list/02/ngot?token=' + vm.token;
      this.$store.dispatch('setLoadingState', true);

      api.fetchTasks(url).then(res => {
          if(res.data.respCode=="0000") {
            if(res.data.data.length > 0) {
              vm.tasksCheck = res.data.data;
            }
            else {
              this.messge = '当前没数据';
              this.noData = true;
            }
            this.$store.dispatch('setLoadingState', false);
          }
      })
      .catch(error => {
        this.$store.dispatch('setLoadingState', false);
        alert('处理失败！');
      })
    },
    // 点击执行，显示提示框，用户确认是否进入地图进行导航
    excuteTask (task_id) {
      this.$router.push({ name: 'taskChckComplete', params: { taskId: task_id}});
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
  .taskCheck
    padding: 0.4rem 0.4rem 0 0.4rem;
    .content
      box-shadow:0 0 10px 10px #f1eeee;
      border-radius:10px
      background: #ffffff;
      position:relative
      margin:10px
      &:after
        content: ''
        clear: both
        display: block
      .task-Title
        width:100%
        height:40px
        line-height:40px
        border-radius:10px 10px 0 0
        text-indent:2em
        background:#4EC9F3
        font-size:15px
        color:#FEFFFF
      .taskContent
        width:100%
        margin:15px auto 20px auto
        text-align:center
        .taskId
          color:#10101
          font-size:15px
        .border-1px
          border-right:1px solid red
        .data
          display:inline-block
          padding-top:20px
          padding-right:10px
          span
            display:block
            margin-bottom:10px
            font-size:14px
          .data-color
            color:#585858
      .btn
        text-align:center
        padding-bottom:15px
        color:#fff
        font-size:15px
        font-weight:500px
        .btn-common
          display:inline-block
          width:150px
          height:40px
          line-height:40px
          border-radius:10px
        .refuseBtn
          background-color:#34C44B
  .msgBoxSize
    width:90%
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-active
    opacity: 0
  .dialog
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    background: rgba(85, 85, 85, .7)
    .submit-dialog
      position: absolute
      left: 50%
      top: 50%
      width: 80%
      height: 30%
      transform: translateX(-50%) translateY(-50%)
      border-radius: .5rem
      box-shadow: 0 0 5px #555
      background-color: #fff
    header
      height: 30%
      padding-left: 10%
      line-height: 5rem
      border-radius: .5rem
      background-color: #f7f7f7
      span
        font-weight: 700
      .close-btn
        position: absolute
        right: 10%
        color: #bbb
        cursor: pointer
        &:hover
          color: #ee7419
    .submit-dialog p
      margin-top: 3rem
      margin-left: 3rem
    .btn-box
      position: absolute
      bottom: 0
      width: 100%
      height: 6rem
      text-align: center
      line-height: 6rem
      button
        width: 7rem;
        height: 2.5rem;
        padding-top:  .3rem
        padding-bottom: .3rem
        line-height: 100%;
        color: #777;
        border: 1px solid #555;
        border-radius: .2rem;
        background-color: #fff;
        cursor: pointer;
        &:hover
          box-shadow: 0 0 5px #bbb
      .yes
        margin-right: 1rem
        color: #fff
        background-color: #ee7419
        border: 1px solid #ee7419
        &:hover
          box-shadow: 0 0 5px #ee7419
</style>
