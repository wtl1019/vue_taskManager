<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../../assets/vux_logo.png">
      <h1></h1>
    </div>
    <group class="form">
      <cell v-for="(val,key) in person" :title="keyTitles[key]">{{val}}</cell>
    </group>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux';
  import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {
    components: {
      Group,
      Cell
    },
    data () {
      return {
        person:[],
        keyTitles: {
          id:'编号',
          user_name:'用户名',
          log_name:'登录名',
          create_time:'创建时间',
          id_no:'身份证号',
          tel_no:'座机号',
          mol_no:'手机号',
          email:'邮箱',
          type:'类型',
          aff_org:'归属机构',
          updated_at:'更新时间',
          created_at:'创建时间'
        },
        commits:null,
        code:null,
        userid:null,
        test:null
      }
    },
    created () {
     /* this.$store.dispatch('changeIndexConf',{
      isBack: false,
      title: '用户信息'
      });*/
      document.title = '用户信息';
      this.getToken();
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
        //token = window.location.href.split("=")[1].split("#")[0]
      let userUrl = this.apiUrl + 'users/current?token=' + this.token;
      this.$http.get(userUrl).then(response => {
            if(response.data.respCode=='0000'){
              console.log(response.data)
              this.person=response.data.data
            }else{
                alert(response.data.respMsg)
            }
          })
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
  .vux-demo {
    text-align: center;
  }
  .logo {
    width: 100px;
    height: 100px
  }
  .form{
    margin : 5px 10px 5px 10px;
  }
</style>
