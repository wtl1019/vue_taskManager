<template>
  <div class="condition">
    <div class="orgnazation">
        <el-select placeholder="所属机构">
            <el-option :label="item.label"
              :value="item.value" v-for="item in orgs">
            </el-option>
        </el-select>
    </div>
    <div class="block">
        <el-date-picker v-model="value2" align="right" type="date"
         placeholder="选择日期"
         :picker-options="pickerOptions1">
        </el-date-picker>
        <a href="#" class="el-icon-search"></a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  data () {
    return {
      orgs: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }
      ],
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: '',
      value2: ''
    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .condition
     width:100%
     height:56px;
     line-height:56px
     border-bottom: 2px solid #ccc
     .orgnazation
        display:inline-block
        width: 110px
        padding-left:10px
     .block
        display:inline-block
        a
          padding-left:10px
</style>
