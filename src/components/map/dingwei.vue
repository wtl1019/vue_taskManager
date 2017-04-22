<template>
  <div>
    <vheader></vheader>
    <transition name="move">
      <div id="location" class="location-wrapper" :center="center">
        <el-amap vid="amap" :plugin="plugin">
        </el-amap>
        <div class="btn">
          <el-button style="float: right; margin-left:20px;" type="primary" @click="completeTask">完成任务</el-button>
          <el-button style="float: right; margin-left:20px;" type="primary" @click="stopTask">取消执行</el-button>
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
  props: {
    task: {
      type: Object
    }
  },
  data() {
    let self = this;
    return {
      timeCount: '',
      task_Id: this.$route.params.taskId,
      lon: this.$route.params.lon,
      lat: this.$route.params.lat,
      center: [],
      currentGeolocation: [],
      plugin: [{
        pName: 'Geolocation',
        showMarker: true,
        zoomToAccuracy: true,
        events: {
          init(instance) {
            alert('1:'+self.timeCount);
            function positionControl() {
              alert('2:jin positionControl方法内');
              instance.getCurrentPosition((status, result) => {
                alert('3:jin getCurrentPosition方法内');
                // 获取当前的位置信息
                self.center = [result.position.lng, result.position.lat];
                alert(result.position);
                alert('4:'+self.timeCount);
              });  
              self.timeCount=setTimeout(positionControl,60000);
            }
            setTimeout(positionControl,6000);
          },
          complete(GeolocationResult) {
            self.upPosition(GeolocationResult.position.lng, GeolocationResult.position.lat);
            alert("定位成功");
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
    this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '当前定位'
    });
    /*bus.$on('id-selected', function(taskId) {
      alert('taskId: ' + taskId);
      this.task_Id = taskId;
    });*/
  },
  methods: {
    upPosition(lon,lat) {
      let upPositionUrl = this.apiUrl + 'locations?token=' + this.token;
      alert('upPositionUrl' + upPositionUrl);
      this.$http.post(upPositionUrl, {task_id: this.task_Id, lon: this.lon, lat: this.lat})
      .then((response) => {
        if (response.data.respCode === "0000") {
          alert('上传成功');
        }
      }, (response) => {
        alert(response.data.respCode);
        alert(response.data.respMsg);
        alert('处理失败');
      });
    },
    completeTask() {
      alert('5 quxiao timeCount:' + this.timeCount);
      clearTimeout(this.timeCount);
      alert('task_Id: ' + this.task_Id);
      // bus.$emit('taskId-select', this.taskId);
      router.push({ name: 'taskComplet', params: { taskId: this.task_Id }});
    },
    stopTask() {
      alert('取消');
      clearTimeout(this.timeCount);
      let stopTaskUrl = this.apiUrl + 'tasks/cancel?token=' + this.token;
      this.$http.post(stopTaskUrl, {task_id: this.task_Id ,describe: ''})
      .then((response) => {
        if (response.data.respCode === "0000") {
          alert('取消成功');
          history.go(-1);
        }
      }, (response) => {
        alert(response.data.respCode);
        alert(response.data.respMsg);
        alert('取消失败');
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
    top: 50px
    left: 0
    bottom: 0
    width:100%
    transform:translate3d(0,0,0)
    &.move-enter-active,.&.move-leave-active
      transition:all 0.3 linear
    &.move-enter,&.move-leave-active
      transform:translate3d(100%,0,0)
    .btn
      position:absolute
      top:60px
      left:60px
      z-index:40
</style>
