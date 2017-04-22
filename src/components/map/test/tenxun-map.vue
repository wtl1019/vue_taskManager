<template>
<div class="mapbody">
  <!--   定义地图显示容器   -->
  <div id="container">
  </div>
</div>
</template>

<script>
  export default {
    created () {
      this.init();
    },
    methods: {
      init () {
        var map = new qq.maps.Map(document.getElementById('container'), {
          center: new qq.maps.LatLng(39.916527,116.397128),
          zoom:8
        });
      }
    }
  };
</script>

<style type="text/css">
.mapbody{
    width:100%;
    height:100%;
}
*{
    margin:0px;
    padding:0px;
}
#container{
    min-width:600px;
    min-height:767px;
}
</style>
