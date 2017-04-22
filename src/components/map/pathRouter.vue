<template>
  <transition name="move">
    <div v-show="showFlag" id="demoComponent" class="pathRouter" ref="task">
      <div class="back" @click="hide">
        <i class="el-icon-arrow-left"></i>
      </div>
      <el-amap vid="amap" :zoom="zoom" :center="center" :amapManager="amapManager">
        <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :events="polyline.events" :strokeColor="polyline.strokeColor"></el-amap-polyline>
      </el-amap>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import { AMapManager } from 'vue-amap';
  import { mapGetters } from 'vuex';

  let amapManager = new AMapManager();
  const POLYGON_ID = 'POLYGON_ID';
  const lineColor = '#F44741';
export default {
  props: {
    task: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      zoom: 12,
      amapManager: amapManager,
      center:  [116.397128,39.916527],
      polyline: {
        vid: POLYGON_ID,
        path: [],
        events: {
          click(e) {
            alert('click polyline');
            alert(e);
          },
          end: (e) => {
            let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
            console.log(newPath);
          }
        },
        editable: false,
        strokeColor: lineColor
      }
    };
  },
  methods: {
    show(task) {
      this.getPath(task);
    },
    getPath(task) {
      let getPathsUrl = this.apiUrl + 'locations/' + task.task_id +'?token=' + this.token;
      alert(getPathsUrl);
      this.$http.get(getPathsUrl)
      .then((response) => {
          let index = Math.floor((response.data.data.length)/2);
          if (response.data.respCode === "0000") {
            this.polyline["path"] = response.data.data;
            // this.center = response.data.data[index];
            this.showFlag = true;
          }
        },(response) => {
        alert(response.data.respMsg);
        alert('获取路线失败');
      });
    },
    hide() {
      this.showFlag = false;
    }
  },
  computed: {
    ...mapGetters([
      'taskTypFlg',
      'apiUrl',
      'wxCode',
      'token'
    ])
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .pathRouter
    position: fixed
    left:0
    top:0
    bottom:0
    z-index:30
    width:100%
    transform:translata3d(0,0,0)
    &.move-enter-active, &.move-leave-active
      transition:all 0.3s linear
    &.move-enter, &.move-leave-active
      transform:translate3d(100%,0,0)
    .back
      position:absolute
      top:10px
      left:0
      z-index:40
      .el-icon-arrow-left
        display:block
        padding:10px
        font-size:20px
        color:red
</style>
