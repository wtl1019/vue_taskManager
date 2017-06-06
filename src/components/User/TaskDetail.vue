<template>
  <div >
    <group title="任务信息">
      <div class="vux-form-preview weui-form-preview task-form">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item" v-for="(val,key) in TaskInfo">
            <label class="weui-form-preview__label">{{keyTitles[key]}}</label>
            <span v-if="key!='devices'&& key!='status'&& key!='state'" class="weui-form-preview__value">{{val}}</span>
          </div>
        </div>
      </div>
    </group>
    <group title="终端信息">
      <div  class="product-item" v-for="item in device" >
        <div>
          <div class="other">终端ID：{{item.device_id}}</div>
          <div class="other">所属机构：{{item.aff_org}}</div>
          <div class="other">开始时间：{{item.created_at}}</div>
          <div class="other">结束时间：{{item.ent_time}}</div>
        </div>
      </div>
    </group>
  </div>
</template>
<script>
  import { FormPreview,Selector, Group ,XHeader,XButton, Popup, Cell, XSwitch,PopupPicker,Divider } from 'vux'
  export default {
    components: {
      FormPreview,Selector, Group,XHeader,XButton, Popup, Cell, XSwitch,PopupPicker,Divider
    },
    data () {
      return {
        Title:'world',
        Collapse:'hello',
        loading: false,
        TaskInfo:null,
        error: null,
        device:[],
        list: [['create_time', 'start_time','end_time']],
        keyTitles:{
          id:'任务编号',
          operator_id:'操作员编号',
          status:'状态',
          get_time:'领取时间',
          run_time:'执行时间',
          finish_time:'完成时间',
          viewed_num:'已阅人数',
          aff_org:'所属机构',
          type:'类型',
          created_at:'创建时间',
          start_time:'起始时间',
          end_time:'结束时间',
          describe:'描述',
          remark:'备注',
          admin_id:'登陆ID',
          updated_at:'更新时间',
      dis_time:'删除时间'

        },
        keyTitles1:{
          id:'编号',
          type:'类型',
          name:'名称',
          check_method:'查验方法',
          aff_org:'归属机构',
          address:'地址',
          longitude:'经度',
          latitude:'纬度',
          standard:'标准及要求',
          status:'状态',
          ent_time:'录入时间',
          created_at:'创建时间',
          updated_at:'更新时间'
        },
        divider1:'任务信息',
        divider2:'设备信息',
      }
    },
    created () {
      /*this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '任务详情'
      });*/
      document.title = '任务详情';
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.TaskInfo=this.$route.params.id
        this.device=this.TaskInfo.devices
      }
    }
  }
</script>
<style>
  .task-form{
    margin : 5px 10px 5px 10px;
  }
</style>
