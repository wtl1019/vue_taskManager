<template>
  <div>
    <transition name="move">
      <div id="location" class="location-wrapper" :center="center">
        <el-amap vid="amap" :plugin="plugin">
        </el-amap>
        <!--<div class="btn">
          <el-button style="float: right; margin-left:20px;" type="primary" @click="completeTask">提交任务</el-button>
          <el-button style="float: right; margin-left:20px;" type="primary" @click="stopTask">取消任务</el-button>
        </div>-->
        <div class="btn-wrapper">
          <div class="btn-common btn-stop" @click="stopTask">取消任务</div>
          <div class="btn-common btn-complete" @click="completeTask">提交任务</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import vheader from '../header/header';
import router from '../../router';
import bus from '../../common/js/bus.js';
import { mapGetters } from 'vuex';
export default {
  data: function () {
    let self = this;
    return {
      timeCount: '',
      task_Id: this.$route.params.taskId,
      device_id: this.$route.params.devId,
      lon: this.$route.params.lon,
      lat: this.$route.params.lat,
      taskType: this.$route.params.taskType,
      standard: this.$route.params.standard,
      center: [],
      currentGeolocation: [],
      plugin: [{
        pName: 'Geolocation',
        showMarker: true,
        zoomToAccuracy: true,
        events: {
          init(instance) {
            function positionControl() {
              //alert('2:jin positionControl方法内');
              instance.getCurrentPosition((status, result) => {
                //alert('3:jin getCurrentPosition方法内');
                // 获取当前的位置信息
                self.center = [result.position.lng, result.position.lat];
                //alert('4:'+self.timeCount);
              });  

              self.timeCount = setTimeout(positionControl,60000);
            }
            self.timeCount = setTimeout(positionControl,1000);
          },
          complete(GeolocationResult) {
            self.upPosition(GeolocationResult.position.lng, GeolocationResult.position.lat);
          },
          error(GeolocationError) {
            alert('定位失败');
          }
          //当回调函数中的status为complete的时候表示定位成功，result为GeolocationResult对象;定位成功时触发此事件
          //当回调函数中的status为error的时候表示定位失败，result为GeolocationError对象,定位失败时触发此事件
        }
      }]
    };
  },
  created() {
    /*this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '当前定位'
    });*/
    document.title = '当前位置';
    /*bus.$on('id-selected', function(taskId) {
      alert('taskId: ' + taskId);
      this.task_Id = taskId;
    });*/
  },
  methods: {
    upPosition(lon,lat) {
      let upPositionUrl = this.apiUrl + 'locations?token=' + this.token;
      //alert('upPositionUrl' + upPositionUrl);

      this.$http.post(upPositionUrl, {task_id: this.task_Id, device_id: this.device_id, lon: lon, lat: lat})
      .then((response) => {
        if (response.data.respCode === "0000") {
          //alert('上传成功');
        }
      }, (response) => {
        // alert(response.data.respCode);
        // alert(response.data.respMsg);
        alert('上传处理失败');
      });
    },
    completeTask() {
      //alert('5 quxiao timeCount:' + this.timeCount);
      clearTimeout(this.timeCount);
      //alert('task_Id: ' + this.task_Id);
      // bus.$emit('taskId-select', this.taskId);
      //这里需要区分是检查还是巡检任务的完成页面
      if(this.taskType == '02'){
        router.push({ name: 'taskChckComplete', params: { taskId: this.task_Id, devId: this.device_id, standard: this.standard}});
      }
      else {
        router.push({ name: 'taskXJComplete', params: { taskId: this.task_Id, devId: this.device_id}});
      }

    },
    stopTask() {
      //alert('取消');
      clearTimeout(this.timeCount);
      let stopTaskUrl = this.apiUrl + 'tasks/cancel?token=' + this.token;
      this.$http.post(stopTaskUrl, {task_id: this.task_Id ,describe: ''})
      .then((response) => {
        if (response.data.respCode === "0000") {
          alert('取消成功');
          history.go(-1);
        }
      }, (response) => {
        //alert(response.data.respCode);
        //alert(response.data.respMsg);
        alert('取消处理失败');
      });
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
    vheader
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.location-wrapper
    position: fixed
    top: 0px
    left: 0
    bottom: 0
    width:100%
    transform:translate3d(0,0,0)
    &.move-enter-active,.&.move-leave-active
      transition:all 0.3 linear
    &.move-enter,&.move-leave-active
      transform:translate3d(100%,0,0)
    .btn-wrapper
      position:absolute
      top:60px
      z-index:40
      width:100%
      text-align:center
      .btn-common
        display:inline-block
        border:1px solid #fff
        padding:10px 15px
        border-radius:10px
        color:#fff
        font-size:15px
      .btn-complete
        background-color:#34C44B
      .btn-stop
        background-color:#DF9D3F
</style>
