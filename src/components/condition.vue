<template>
  <div class="sidebar">
    <div class="sidebar-con" :class="{showbar: showbar}">
      <div class="sidebar_head" v-if="leftNavStatus">
        <div class="user">
          <span>请选择条件</span>
        </div>
        <group>
          <popup-picker :title="title1" :data="list1" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange"></popup-picker>
        </group>
        <group>
          <datetime v-model="value2" title="开始日期" clear-text="today" @on-clear="setToday"></datetime>
        </group>
        <group>
          <datetime v-model="value2" title="结束日期" clear-text="today" @on-clear="setToday"></datetime>
        </group>
        <group>
          <popup-picker title="任务状态" :data="list2" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange"></popup-picker>
        </group>
        <group>
          <popup-picker title="人员姓名" :data="list1" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange"></popup-picker>
        </group>

      </div>
    </div>
    <div v-show="showbar" class="sidebar_mask" @click="hidebar"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { PopupPicker, Group, Cell, Picker, XButton, Divider, XSwitch, Datetime  } from 'vux';
import * as _ from '../util/tool';
import { mapGetters, mapActions } from 'vuex';
export default{
  data () {
    return {
      title1: '所属支行',
      list1: [['A支行', 'B支行', 'C支行', 'E支行']],
      list2:[['已执行', '未执行']],
      value1: ['请选择'],
      value2: '请选择'
    };
  },
  components: {
    PopupPicker,
    Group,
    Picker,
    XButton,
    Divider,
    Cell,
    XSwitch,
    Datetime
  },
  computed: {
    ...mapGetters([
      'leftNavStatus'
    ]),
    showbar () {
      return this.$store.state.com.leftNavStatus;
    }
  },
  methods: {
    onChange (val) {
      console.log('val change', val)
    },
    onShow () {
      console.log('on show')
    },
    onHide (type) {
      console.log('on hide', type)
    },
    setToday (value) {
      let now = new Date()
      let cmonth = now.getMonth() + 1
      let day = now.getDate()
      if (cmonth < 10) cmonth = '0' + cmonth
      if (day < 10) day = '0' + day
      this.$data.value7 = now.getFullYear() + '-' + cmonth + '-' + day
      console.log('set today ok')
    },
    hidebar () {
      this.$store.dispatch('setNavState', false);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

.sidebar
  .sidebar-con
      position: fixed
      top: 0
      left: px2rem(-600px)
      transform: translateZ(0)
      width: px2rem(600px)
      z-index: 1002
      background: #fff
      height: 100%
      overflow: auto
      transition: all .3s ease
      &.showbar
        transform: translateX(px2rem(600px))
      .sidebar_head
        padding: 20px 35px 0
        color: #fff
        background: #ccc
  .sidebar_mask
      position: fixed
      width: 100%
      margin: 0 auto
      top: 0
      left: 0
      bottom: 0
      right: 0
      z-index: 1001
      background: rgba(0,0,0,.7)
</style>
