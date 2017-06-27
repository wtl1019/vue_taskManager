<template>
  <div>
    <transition name="move">
      <div id="location" class="location-wrapper">
        <div id="mapContainer" class="mapContainer"></div>
        <div class='center'>
          <div id='bt' class="btmtip">点击去高德地图</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import vheader from '../header/header';
import router from '../../router';
import bus from '../../common/js/bus.js';
import mapapi from '../../common/js/map_gaode.js';
import { mapGetters } from 'vuex';
export default {
  data: function () {
    let self = this;
    return {
      start:[],
      end:[this.$route.params.lon,this.$route.params.lat],
      //end: [116.427281, 39.903719]
    };
  },
  created() {
    document.title = '驾车路线';
  },
  mounted() {
    var self = this;
    var button = document.getElementById('bt');
    let map = mapapi.getMapBase("mapContainer");
    let geolocation;

    map.plugin('AMap.Geolocation', function() {
      geolocation = mapapi.getGeolocation();
      //map.addControl(geolocation);//控制页面是否显示位置图标

      geolocation.getCurrentPosition();

      AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
      AMap.event.addListener(geolocation, 'error', onError);
    });

     //解析定位结果
    function onComplete(data) {
      self.start = [data.position.getLng(), data.position.getLat()];
      AMap.plugin(["AMap.Driving"], function() {
        var drivingOption = {
          map: map,
          city: '北京市',
          policy: AMap.DrivingPolicy.LEAST_TIME
        };
        var driving = new AMap.Driving(drivingOption); //构造公交导航类
        //根据起终点坐标规划驾车路线
        driving.search(self.start, self.end, function(status, result) {
          button.onclick = function() {
            driving.searchOnAMAP({
              origin: result.origin,
              destination: result.destination
            });
          }
        });
      });
    }
    //解析定位错误信息
    function onError(data) {
      alert('定位失败');
    }
    //map.addControl(new AMap.ToolBar());
    if (AMap.UA.mobile) {
      bt.style.fontSize = '16px';
    } else {
      bt.style.marginRight = '10px';
    }
  },
  methods: {
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
    position:absolute
    top:0
    left:0
    right:0
    bottom:0
    width:100%
    height:100%
    text-align: center
    font-size:12px
    transform:translate3d(0,0,0)
    &.move-enter-active,.&.move-leave-active
      transition:all 0.3 linear
    &.move-enter,&.move-leave-active
      transform:translate3d(100%,0,0)
    .mapContainer
      margin:0;
      height:100%;
      width:100%;
      text-align: center;
      font-size:12px;
    .center
      position: absolute
      width: 100%
      bottom: 24px
      z-index:40
      .btmtip
        cursor: pointer
        border-radius: 5px
        background-color: #0D9BF2
        padding: 6px
        width: 160px
        color: white
        margin: 0 auto
</style>
