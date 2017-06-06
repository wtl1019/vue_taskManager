<template>
  <div>
      <div class="top-button">
        <button-tab>
          <button-tab-item @on-item-click="sta(s1)" >{{ state1}}</button-tab-item>
          <button-tab-item @on-item-click="sta(s2)"  selected>{{ state2 }}</button-tab-item>
          <button-tab-item @on-item-click="sta(s3)">{{state3 }}</button-tab-item>
        </button-tab>
      </div>
      <group>
        <div  class="product-item" v-for="item in task" >
          <router-link  :to="{ name: 'TaskDetail', params: { id: item }}">
            <div v-if="item.state=1" class="task-state">
              <div class="name">任务ID：{{item.id}}</div>
              <div class="name">开始时间：{{item.start_time}}</div>
              <div class="name">结束时间：{{item.end_time}}</div>
              <div class="other">描述：{{item.describe}}</div>
            </div>
          </router-link>
        </div>
      </group>
    </div>
</template>

<script>

 import {ButtonTab, ButtonTabItem, Divider,Group } from 'vux';
   import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
  export default {
    components: {
      ButtonTab, ButtonTabItem, Divider,Group
    },
    data () {
      return {
        UserTask:  [],
        task:[],
        state1:'未执行',
        state2:'执行中',
        state3:'已执行',
        state4:'检查任务',
        state5:'巡检任务',
        filter:[],
        stat:'04',
        s1:'03',
        s2:'04',
        s3:'05',
        litile:{
          task_id:'任务编号',
          operator_id:'操作员编号',
          status:'状态',
          get_time:'领取时间',
          run_time:'执行时间',
          finish_time:'完成时间',
          viewed_num:'已阅人数',
          id:'编号',
          type:'类型',
          create_time:'创建时间',
          start_time:'起始时间',
          end_time:'结束时间',
          describe:'描述',
          remark:'备注',

        },
        typedata:'all',
        statusdata:'all',
        person:'1'
      }
    },
    created () {
      /*this.$store.dispatch('changeIndexConf',{
      isBack: false,
      title: '用户任务'
      });*/
      document.title = '用户任务';
      this.getToken()
    },
    watch: {
     stat: 'getToken'
    },
    computed:{
      state: function () {
        var num=this.stat;
        return this.UserTask.filter(function (task) {
          return task.state == num
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
      fetchData() {
        //token = window.location.href.split("=")[1].split("#")[0]

        this.$http.get(this.apiUrl+'users/current?token='+this.token).then(response => {

          if(response.data.respCode=='0000'){
            this.person=response.data.data.id
          //  alert(globalapiurl+'users/'+this.typedata+'/'+this.stat+'/'+this.person+'?token='+token)
            this.$http.get(this.apiUrl+'users/'+this.typedata+'/'+this.stat+'/'+this.person+'?token='+this.token).then(response => {
              if(response.data.respCode=='0000'){
                this.UserTask=response.data.data
                this.task=this.UserTask[0].tasks
              }else{
                alert(response.data.respMsg)
              }
            })
          }else{
            alert(response.data.respMsg)
          }
        })
      },
      sta(param){
        this.stat=param
      },
      typ(param){
        this.typedata=param
      }
    },
    filters:{
      conditions: function(items){
        var searchRegex = new RegExp(this.booksearchtext, 'i');
        var arr=[];
        for(var i= 0, j = items.length; i < j; i++){
          arr[i] = {};
          arr[i].contacters = [];
          for(var item = 0, len = items[i].contacters.length; item < len; item++){
            if(searchRegex.test(items[i].contacters[item].name) || searchRegex.test(items[i].contacters[item].enterpriseName) || searchRegex.test(items[i].contacters[item].phoneNumber) || searchRegex.test(items[i].contacters[item].uniqueID)){
              arr[i].firstLetter = items[i].firstLetter;
              arr[i].contacters.push(items[i].contacters[item]);
            }
          }
        }
        return arr;
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
  .vux-button-group-current
    {
      background: #20A0FF
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
  .top-button{
    margin : 5px 10px 5px 10px;
  }
  .task-state{
    background-color: #FFFFFF;
  }
  .product-item{
    padding:10px 6px;
    border-bottom: 1px solid #999;
    display: flex;
    background-color: #FFFFFF;
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
</style>
