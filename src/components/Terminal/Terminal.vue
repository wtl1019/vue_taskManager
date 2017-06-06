<template>
  <div>
    <group class="group">
          <popup-picker :title="title2" :data="listname" v-model="value2" @on-show="onShow" @on-hide="onHide" @on-change="onChange"></popup-picker>
    </group>
    <group class="group">
        <x-button type="primary" @click.native="queryData()">查询</x-button>
    </group>
    <group>
      <div class="product-item" v-for="item in terminal">
        <div>
          <router-link  :to="{ name: 'TerDetail', params: { id: item }}">
          <div class="name">设备编号：{{item.id}}</div>
          <div class="name">设备名称：{{item.name}}</div>
          <div class="name">所属机构：{{item.address}}</div>
          <div class="name">设备类型：{{item.type}}</div>
          </router-link>
        </div>
      </div>
    </group>
  </div>
</template>

<script>
  import { FormPreview,Selector, Group ,XHeader,XButton, Popup, Cell, XSwitch,PopupPicker,Flexbox, FlexboxItem} from 'vux';
  import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

  export default {
    components: {
      FormPreview,Selector, Group,XHeader,XButton, Popup, Cell, XSwitch,PopupPicker, Flexbox, FlexboxItem
    },
    data () {
      return {
        title1:'所属机构',
        title2:'终端类型',
        value1: [],
        value2: ['全部'],
        defaultValue:"",
        show7: false,
        headerLabel:"终端信息",
        terminal: [],
        keyTitles: {
          deviceNo:'设备编号',
          deviceName: '设备名称',
          devType: '设备类型',
          orgnization:'机构号',
          orgName: '机构名称',
          belongPerson: '负责人',
          address: '地址',
          location: '坐标'
        },
        listdata:[],
        listname:[],
        listcode:[],
        listkey:null
      }
    },
    created () {
      /*this.$store.dispatch('changeIndexConf',{
      isBack: false,
      title: '终端管理'
      });*/
      document.title = '终端管理';
      this.getToken()
    },
    watch: {
      '$route': 'getToken'
    },
    computed: {
      filterlist: function () {
        var num=this.value1;
        return this.terminal.filter(function (number) {
          return number.orgnization == num
        })
      }
    },
    methods: {
      getToken() {
        //生产
        var str = window.location.search;
        var arr = str.replace('?','').split('&');
        var token = arr[0].split('=')[1];

        this.$store.dispatch('setToken', token);
        this.fetchData();
      },
      fetchData () {
        let terminalUrl = this.apiUrl + 'devices/device/types?token=' + this.token;
        this.$http.get(terminalUrl)
        .then(response => {
          if(response.data.respCode=='0000'){
            this.listdata=response.data.data
            var arr=Array()
            for(var i=0;i<this.listdata.length;i++){
              this.listcode[i]=this.listdata[i].code
              arr[i]=this.listdata[i].name
            }
            this.listname.push(arr)
          }else{
              alert(response.data.respMsg)
          }
        })

        this.$http.get(this.apiUrl+'devices?token='+this.token)
        .then(response => {
          if(response.data.respCode=='0000'){
            this.terminal=response.data.data
          }else{
            alert(response.data.respMsg)
          }

        })
      },
      queryData(){
        for(var i=0;i<this.listdata.length;i++){
          if(this.value2==this.listdata[i].name){
              this.listkey=i
              break
          }
        }

        this.$http.get(this.apiUrl+'devices/list/'+this.listcode[this.listkey]+'?token='+this.token).then(response => {
          if(response.data.respCode=='0000'){
            console.log(response.data)
            this.terminal=response.data.data
          }else{
            alert(response.data.respMsg)
          }
        })
      },
      onChange (val) {
        console.log('val change', val)
      },
      onShow () {
        console.log('on show')
      },
      onHide (type) {
        console.log('on hide', type)
      }
    },
    computed: {
      ...mapGetters([
        'apiUrl',
        'token'
      ])
    }
  }
</script>

<style>
  .group{
    margin : 0px 10px 0px 10px;
  }


  image[lazy=loading] {
    width: 110px;
    height: 110px;
    margin: auto;
  }
  .mint-swipe-item img{
    width:100%;
    height:auto;
  }
  .product-item{

    padding:10px 6px;
    border-bottom: 1px solid #999;
    display: flex;
    background-color: #FFFFFF;

    border-radius: 10px;
    margin : 5px 10px 5px 10px;
  }
  .product-item img{
    width:110px;
    height: 110px;
    margin-right: 6px;
  }
  .product-item .name{
    color: #333;
  }
  .product-item .description{
    color: #999;
    font-size: 10px;
    line-height: 16px;
    height: 32px;
  }
  .product-item .deviceName{
    color: #999;
    font-size: 10px;
    line-height: 16px;
    height: 16px;
  }
  .product-item button{
    font-size: 10px;
    height: 16px;
    padding: 0 4px;
  }
  .product-item span{
    color: #999;
    font-size: 10px;
  }
  .product-item .other{
    color: #666;
  }
  .page-infinite-loading {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .page-infinite-loading div {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
  .weui-btn_primary {
    background-color: #20A0FF
  }
</style>
