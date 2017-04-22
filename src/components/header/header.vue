<template>
  <div class="header">
    <div class="title">
      <a v-show="isBack" class="back t-icon" @click="goBack"><i class="el-icon-arrow-left"></i></a>
      <p>{{title}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';

export default{
  data: function () {
    return {};
  },
  computed: {
    ...mapGetters([
      'title',
      'isBack'
    ])
  },
  methods: {
    goBack: function () {
      history.go(-1);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
   .header
     position: relative
     top: 0
     width: 100%
     height: 48px
     line-height: 48px
     text-align: center
     box-sizing: border-box;
     background: #20A0FF
     .title
       p
          color: #fff
          text-align: center
          font-size: 18px
       .t-icon
          width: 24px
          height: 24px
          display: block
          top: 12px
          i
            width: 100%;
            height: 100%;
            display: block;
            line-height: 24px;
            color: #fff;
       .back
         position: absolute
         left: 10px
</style>
