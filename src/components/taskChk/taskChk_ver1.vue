<template>
  <div>
    <el-card class="box-card" v-show="noData">
        <div class="text item">
          {{messge}}
        </div>
    </el-card>
    <div class="taskXJ" v-for="item in tasksCheck">
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
          设备描述：{{item.describe}}
        </div>
        <div class="text item">
          地  址：{{item.address}}
        </div>
        <div class="clearfix">
          <el-button v-show="btnGet" style="float: right; margin-left:20px;" type="primary" @click="reciveTask(item)">领取</el-button>
          <el-button v-show="btnExcute" style="float: right;" type="primary" @click="excuteTask(item)">执行</el-button>
          <el-button v-show="btnGet" style="float: right;" type="primary" @click="refuseReson(item,'1')">拒绝</el-button>
          <el-button v-show="btnExcute" style="float: right;" type="primary" @click="path(item)">路线</el-button>
        </div>
      </el-card>
    </div>
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
      btnGet: '',
      btnExcute: '',
      textFlg: '',
      tasksCheck: [],
      dialogVisible: false,
      showDialog: false,
      submitError: false,
      selectedTask:{}
    };
  },
  created () {
    this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '检查任务'
    });

    /*this.$store.dispatch('getToken',this.wxCode);
    if(this.token)
    {
       this.getTasks();
    }*/
    this.getTasks(this.wxCode);
  },
  methods: {
    /*getToken(wxCode) {
      let tokenUrl = this.apiUrl + 'auth/token?code='+ wxCode;
      //alert('taskXJ//tokenUrl : '+tokenUrl);
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
      // 获取待领取/待执行巡检任务列表
      let taskstate = vm.$route.params.enterMenuFlg=='1'?'got':'ngot';

      let url = 'devices/2/list/02/'+ taskstate +'?token=' + vm.token;

      this.$store.dispatch('setLoadingState', true);

      api.fetchTasks(url).then(res => {
          if(res.data.respCode=="0000") {
            if(res.data.data.length > 0) {
              vm.tasksCheck = res.data.data;
              if (vm.$route.params.enterMenuFlg == '1') {
                vm.btnExcute = true;
                vm.btnGet = false;
              } else {
                vm.btnGet = true; // 领取
                vm.btnExcute = false;
              }
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
        console.log(error);
      })
    },
    /*getTasks() {
      // 获取待领取/待执行任务列表
      let taskstate = this.$route.params.enterMenuFlg=='1'?'nexec':'ngot';
      let url = this.apiUrl + 'devices/2/list/02/'+ taskstate +'?token=' + this.token;
      this.$http.get(url).then((response) => {
        if (response.data.respCode === "0000") {
          this.tasksCheck = response.data.data;

          if (this.$route.params.enterMenuFlg == '1') {
            this.btnExcute = true;
            this.btnGet = false;
          } else {
            this.btnGet = true; // 领取
            this.btnExcute = false;
          }
        }
      },(response) => {
        alert('处理失败');
      });
    },*/
    // 点击执行，显示提示框，用户确认是否进入地图进行导航
    excuteTask (item) {
      // let taskId = item.task_id;
      // bus.$emit('id-selected', taskId);
      // router.push('dingwei');
      let executeUrl = this.apiUrl + 'tasks/exec?token=' + this.token;
      this.$http.post(executeUrl, {task_id: item.task_id})
      .then((response) => {
        if (response.data.respCode === "0000") {
          this.$router.push({ name: 'dingwei', params: { taskId: item.task_id, devId: item.device_id, lon: item.longitude, lat: item.latitude, standard: item.standard, taskType: '02'}});
        }
      }, (response) => {
        this.$router.push({ name: 'dingwei', params: { taskId: item.task_id, devId: item.device_id, lon: item.longitude, lat: item.latitude, standard: item.standard, taskType: '02'}});
      });
    },
    // stata=0 领取任务。发送后台标识即可
    reciveTask (item) {
      let reciveuUrl = this.apiUrl + 'tasks/get?token=' + this.token;
      alert(item.task_id);
      this.$http.post(reciveuUrl, {task_id:item.task_id})
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
        this.tasksCheck = [];
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
            this.tasksCheck = [];
            this.getTasks(); // 重新刷新列表
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
