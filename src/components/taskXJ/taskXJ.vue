<template>
  <div>
    <el-card class="box-card" v-show="noData">
        <div class="text item">
          {{messge}}
        </div>
    </el-card>
    <div class="taskCheck" v-for="item in tasksXJ">
      <div class="content">
        <div class="task-Title">{{item.describe}}</div>
        <div class="taskContent">
          <div calss="taskId">任务号：{{item.task_id}}</div>
          <div class="data" v-show="btnExcute">
            <span class="data-color">设备编号</span>
            <span>{{item.product_id}}</span>
          </div>
          <div class="data" v-show="btnExcute">
            <span class="data-color">地  址</span>
            <span class="data-address">{{item.install_location}}</span>
          </div>
          <div class="data" v-show="btnGet">
            <span class="data-color">开始时间</span>
            <span>{{item.start_time}}</span>
          </div>
          <div class="data" v-show="btnGet">
            <span class="data-color">结束时间</span>
            <span class="data-address">{{item.end_time}}</span>
          </div>
        </div>
        <div class="btn">
          <div class="btn-common getBtn" v-show="btnGet" @click="reciveTask(item)">领 取</div>
          <div class="btn-common refuseBtn" v-show="btnGet" @click="refuseReson(item)">拒 绝</div>
          <div class="btn-common getBtn" v-show="btnExcute" @click="path(item)">路 线</div>
          <div class="btn-common refuseBtn" v-show="btnExcute" @click="excuteTask(item)">执 行</div>
        </div>
      </div>
    </div>
   <!-- <div class="taskXJ" v-for="item in tasksXJ">
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
          任务描述：{{item.describe}}
        </div>
        <div class="text item">
          地  址：{{item.install_location}}
        </div>
        <div class="clearfix">
          <el-button v-show="btnGet" style="float: right; margin-left:20px;" type="primary" @click="reciveTask(item)">领取</el-button>
          <el-button v-show="btnExcute" style="float: right;" type="primary" @click="excuteTask(item)">执行</el-button>
          <el-button v-show="btnGet" style="float: right;" type="primary" @click="refuseReson(item)">拒绝</el-button>
          <el-button v-show="btnExcute" style="float: right;" type="primary" @click="path(item)">路线</el-button>
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
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import bus from '../../common/js/bus.js';
import * as _ from '../../util/tool';
import api from '../../fetch/api';

export default {
  data: function () {
    return {
      noData: false,
      messge: '',
      btnGet: false,
      btnExcute: false,
      textFlg: '',
      tasksXJ: [],
      dialogVisible: false,
      showDialog: false,
      submitError: false,
      selectedTask:{},
      refResonValue:''
    };
  },
  created () {
    /*this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '巡检任务'
    });*/
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
    /*getTasks() {
      let vm = this;
      // 获取待领取/待执行巡检任务列表
      let taskstate = vm.$route.params.enterMenuFlg=='1'?'nexec':'ngot';
      let url = vm.apiUrl + 'devices/2/list/01/'+ taskstate +'?token=' + vm.token;

      this.$store.dispatch('setLoadingState', true);

      vm.$http.get(url).then((response) => {
        if (response.data.respCode === "0000") {
          vm.tasksXJ = response.data.data;
          if (vm.$route.params.enterMenuFlg == '1') {
            vm.btnExcute = true;
            vm.btnGet = false;
          } else {
            vm.btnGet = true; // 领取
            vm.btnExcute = false;
          }
          this.$store.dispatch('setLoadingState', false);
        }
      },(response) => {
        this.$store.dispatch('setLoadingState', false);
        alert('处理失败');
      });
    },*/
    getTasks() {
      let vm = this;
      // 获取待领取/待执行巡检任务列表
      let taskstate = vm.$route.params.enterMenuFlg=='1'?'got':'ngot';
      let url = 'tasks/list/01/'+ taskstate +'?token=' + vm.token;
      //alert('url:'+url);
      this.$store.dispatch('setLoadingState', true);

      api.fetchTasks(url).then(res => {
          if(res.data.respCode=="0000") {
            //alert(res.data.data);
            if(res.data.data.length > 0) {
              vm.tasksXJ = res.data.data;
              if (vm.$route.params.enterMenuFlg == '1') {
                document.title = '巡检任务-待执行';
                vm.btnExcute = true;
                vm.btnGet = false;
              } else {
              document.title = '巡检任务-待领取';
              vm.btnGet = true; // 领取
              vm.btnExcute = false;
              }
              this.$store.dispatch('setLoadingState', false);
            }
            else {
              document.title = '巡检任务';
              this.messge = '当前没数据';
              this.noData = true;
              this.$store.dispatch('setLoadingState', false);
            }
        }
      })
      .catch(error => {
        this.$store.dispatch('setLoadingState', false);
        console.log(error);
      })
    },
    // 点击执行，显示提示框，用户确认是否进入地图进行导航
    excuteTask (item) {
      // let taskId = item.task_id;
      // bus.$emit('id-selected', taskId);
      // router.push('dingwei');
      // taskType 01 巡检任务
      let executeUrl = this.apiUrl + 'tasks/exec?token=' + this.token;
      this.$http.post(executeUrl, {task_id: item.task_id})
      .then((response) => {
        if (response.data.respCode === "0000") {
          this.$router.push({ name: 'dingwei', params: { taskId: item.task_id, devId: item.device_id, lon: item.longitude, lat: item.latitude, taskType: '01'}});
        }
      }, (response) => {
        this.$router.push({ name: 'dingwei', params: { taskId: item.task_id, devId: item.device_id, lon: item.longitude, lat: item.latitude, taskType: '01'}});
      });
    },
    // stata=0 领取任务。发送后台标识即可
    reciveTask (item) {
      let reciveuUrl = this.apiUrl + 'tasks/get?token=' + this.token;
      this.$http.post(reciveuUrl, {task_id: item.task_id})
      .then((response) => {
        if (response.data.respCode === "0000") {
          this.showDialog = true;
          this.submitError = false;
          this.info = '领取成功！';
        }
      }, (response) => {
        alert(response.data.respCode);
        alert(response.data.respMsg);
        alert('处理失败');
      })
      .then((response) => {
        //拒绝成功后前数据会保留，所以先置为空
        this.tasksXJ = [];
        this.getTasks(); // 重新刷新列表
      });
    },
    refuseReson (item) {
      this.$prompt('请输入拒绝原因:', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'msgBoxSize'/*,
          inputPattern: /^[s|S]{2,}$/,
          inputErrorMessage: '原因不能为空'*/
        }).then(({ value }) => {

          let refuseTaskUrl = this.apiUrl + 'tasks/refuse?token=' + this.token;
          this.$http.post(refuseTaskUrl, {task_id: item.task_id ,describe: value})
          .then((response) => {
            if (response.data.respCode === "0000") {
              this.showDialog = true;
              this.submitError = false;
              this.info = '拒绝成功！';
            }
          }, (response) => {
              alert(response.data.respCode);
              alert(response.data.respMsg);
          })
          .then((response) => {
            this.getTasks(); // 重新刷新列表
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
    },
    path(item) {
      /*this.$store.dispatch('setAddress', {
        name: item.address,
        lat: item.latitude,
        lon:item.longitude
      });
      router.push('navigation');*/
      this.$router.push({ name: 'navigation', params: { name: item.install_location, lon:item.longitude, lat: item.latitude }});
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
          width:100px
          height:30px
          line-height:30px
          border-radius:10px
        .getBtn
          background-color:#DF9D3F
        .refuseBtn
          background-color:#34C44B
        button
          border-radius:10px
          padding:5px 20px
          color:#fff
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
