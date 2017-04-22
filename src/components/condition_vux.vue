<template>
  <div>
    <group>
      <popup-picker :title="title1" :data="list1" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange"></popup-picker>
    </group>
    <group>
      <datetime v-model="value2" @on-change="change" title="开始日期" clear-text="today" @on-clear="setToday"></datetime>
    </group>
    <group>
      <datetime v-model="value2" @on-change="change" title="结束日期" clear-text="today" @on-clear="setToday"></datetime>
    </group>
    <group>
      <popup-picker title="任务状态" :data="list2" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange"></popup-picker>
    </group>
    <group>
      <popup-picker title="人员姓名" :data="list1" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange"></popup-picker>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
import { PopupPicker, Group, Cell, Picker, XButton, Divider, XSwitch, Datetime  } from 'vux';
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
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
