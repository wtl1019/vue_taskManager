<template id="child-map">
  <div id="map" :style="style"></div>
</template>

<script src="../../common/js/baidu.js"></script>
<script>
  export default{
    props: {
      height: {
        type: Number,
        default: 300
      },
      longitude: {
        type: Number,
        default: 116.404
      },
      latitude: {
        type: Number,
        default: 39.915
      }
    },
    data () {
      return {
        style: {
          width: '100%',
          height: this.height + 'px'
        }
      };
    },
    mounted () {
      var map = new BMap.Map('map');
      var point = new BMap.Point(this.longitude, this.latitude);
      map.centerAndZoom(point, 12);
      var marker = new BMap.Marker(point);  // 创建标注
      map.addOverlay(marker);               // 将标注添加到地图中
    }
  };
</script>

