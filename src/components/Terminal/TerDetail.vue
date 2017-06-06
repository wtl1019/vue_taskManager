<template>
  <div >
    <div >
      <div class="vux-form-preview weui-form-preview Ter-form">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item" v-for="(val,key) in TermInfo">
            <label class="weui-form-preview__label">{{keyTitles[key]}}</label>
            <span class="weui-form-preview__value">{{val}}</span>
          </div>
          <router-link  :to="{ name: 'location' , params: { id: param }}">
            <x-button type="primary" >查看终端定位</x-button>
          </router-link>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>
<script>
  import { FormPreview,Selector, Group ,XHeader,XButton, Popup, Cell, XSwitch,PopupPicker} from 'vux'
  export default {
    components: {
      FormPreview,Selector, Group,XHeader,XButton, Popup, Cell, XSwitch,PopupPicker
    },
    data () {
      return {
        loading: false,
        TermInfo:null,
        error: null,
        param:[],
        keyTitles:{
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
        }
      }
    },
    created () {
      /*this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '终端详情'
      });*/
      document.title = '终端详情';
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        //this.loading = true
        this.TermInfo=this.$route.params.id
        this.param[0]=parseFloat(this.TermInfo.longitude)
        this.param[1]=parseFloat(this.TermInfo.latitude)
      }
    }
  }
</script>
<style>
.Ter-form{
  margin : 5px 10px 5px 10px;
}
</style>
