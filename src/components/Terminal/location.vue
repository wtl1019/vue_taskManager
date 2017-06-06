<template>
  <el-amap vid="amapDemo">
    <el-amap-marker v-for="marker in markers" :position="marker.position">
    </el-amap-marker>
  </el-amap>
</template>

<script>
  export default {
    data() {
      return {
        markers: [],
        locat:null
      };
    },
    mounted() {
      this.markers = [
        {
          position:this.locat
        }
      ];
    },
    created () {
      /*this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '终端位置'
      });*/
      document.title = '终端位置';
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.locat=this.$route.params.id
      }
    },
  };
</script>
