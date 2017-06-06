<template>
<div>
  <div class="mapbody">
     <iframe style="width:100%;height:550px;" :src="src"></iframe>
  </div>
</div>
</template>

<script>
  import vheader from '../header/header';

  export default {
    data: function () {
      return {
        closeId: '',
        src: ''
      };
    },
    created() {
      /*this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '路线规划'
      });*/
      document.title = '路线规划';
      this.src='http://apis.map.qq.com/tools/routeplan/eword=' + this.$route.params.name +'&epointx=' + this.$route.params.lon + '&epointy=' +this.$route.params.lat + '?referer=myapp&key=KXFBZ-O2HR6-72LS2-MSNRA-Y5P45-DVF6H';
    },
    components: {
      vheader
    }
  };
</script>

<style type="text/css">
.mapbody{
  width: 100%;
  height: 500px;
}
</style>
