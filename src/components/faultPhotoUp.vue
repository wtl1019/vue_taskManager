<template>
  <div>
    <h1>我是主页，请在地址栏输入路由</h1>
  </div>
</template>

<script>
import vheader from './header/header';
import api from '../fetch/api';
import * as _ from '../util/tool';
import { mapActions } from 'vuex';
import bus from '../common/js/bus.js';
import { mapGetters } from 'vuex';

export default{
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.wapper
  width:96%
  height:100%
  margin:25px 2%
  .unableTxt
    width:87%
  .upPhoto
    .el-upload--picture-card
      width:100px
      height:100px
      line-height:100px
  .c-Publish
    padding-top: .5rem
    border-bottom: 1px solid #f1f1f1
    .Pu-img
      margin: 1rem 0px
      overflow: hidden
      padding: 0px 0.5rem
      span a img
        width: 100%
      .Pu-Add-img input
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        opacity: 0
      a
        position: relative
        display: inline-block
        width: 4rem
        height: 4rem
        overflow: hidden
        float: left
        margin: 0 1.9% .4rem 1.9%
        .addImg
          width: 3.888rem
          height: 3.9rem
          text-align: center
          line-height: 3.3rem
          font-size: 3.5rem
          color: #f9696c
          border: 1px solid #c7c7c7
          > img
            height: 4rem
</style>

