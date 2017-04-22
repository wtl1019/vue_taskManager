<template>
  <div>
    <vheader></vheader>
    <div class="taskXJ" v-for="o in 10">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 24px;">巡检任务1</span>
        </div>
        <div class="text item">
          设备编号：{{1}}
        </div>
        <div class="text item">
          责任人：{{1}}
        </div>
        <div class="text item">
          地  址：{{322}}
        </div>
        <el-button style="float: right;margin-bottom: 5px;" type="primary" @click="reciveTask">领取</el-button>
      </el-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import vheader from '../header/header';
import condition from '../condition';
export default {
  data: function () {
    return {
      tasksXJ: {}
    };
  },
  created () {
    this.$store.commit('changeIndexConf', {
      isBack: true,
      title: '检查任务'
    });
    this.$http.get('').then((response) => {
      response = response.body;
      if (response.respCode === '0000') {
        this.tasksXJ = response.data;
      }
    });
  },
  methods: {
    reciveTask () {
      this.$http.post('').then((response) => {
        response = response.body;
        if (response.respCode === '0000') {
        }
      });
    }
  },
  components: {
    condition,
    vheader
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .text {
    font-size: 14px;
  }
  .item {
    padding: 12px 0;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .box-card {
    width: 95%;
    margin:10px auto
  }
</style>

