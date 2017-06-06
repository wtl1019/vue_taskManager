<template>
  <div style={width:100;height:100}>
    <group title="single column">
      <popup-picker :title="title" :data="list" v-model="value"  placeholder="请选择"></popup-picker>
    </group>
    <button @click="submit">submit</button>
  </div>
</template>

<script>
import { PopupPicker, Group, Cell, Picker, XButton, Divider, XSwitch } from 'vux';
import api from '../../fetch/api';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  components: {
    PopupPicker,
    Group,
    Picker,
    XButton,
    Divider,
    Cell,
    XSwitch
  },
  methods: {
  },
  data () {
    return {
      title: '手机机型',
      list: [],
      value: []
    }
  },
  created() {
    var wxCode = 'qweqew';
    this.getToken(wxCode);
  },
  methods: {
    submit() {
      alert(this.value);
    },
    getToken(wxCode) {
      let tokenUrl = 'http://ipqc.seuic.info/basic/web/smart_security/public/index.php/api/auth/token?code='+ wxCode;
      // alert('taskXJ//tokenUrl : '+tokenUrl);
      this.$http({
        method: 'GET',
        url: tokenUrl,
        data: {}
      }).then((response) => {
        if (response.data.respCode === "0000") {
          this.$store.dispatch('setToken', response.data.data);
          this.getDevs();
        }
        else {
          alert('token返回错误:' + response.data.respMsg);
        }
      }, (response) => {
        alert('处理失败');
      })
    },
    getDevs() {
      let vm = this;
      // 获取待领取/待执行巡检任务列表
      let url = 'devices/device/types?token=' + vm.token;

      api.fetchTasks(url).then(res => {
          if(res.data.respCode=="0000") {
            let arry=new Array();
            for(let i=0;i<res.data.data.length;i++)
            {
              arry.push(res.data.data[i].name);
            }
            vm.list.push(arry);
          }
      })
      .catch(error => {
        alert('cuo le');
        console.log(error);
      })
    }
  },
  computed: {
    ...mapGetters([
      'apiUrl',
      'wxCode',
      'token'
    ])
  }
}
</script>

<style scoped>
.picker-buttons {
  margin: 0 15px;
}
</style>

