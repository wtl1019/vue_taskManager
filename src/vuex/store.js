import Vue from 'vue';
import Vuex from 'vuex';

import com from './modules/com';
import base from './modules/base'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      com,
      base
    }
});


/*const store = new Vuex.Store({
  state: {
    // 公共
    comm: {
      login: {
        memberId: '',
        userData: ''
      },
      code: '',
      apiUrl: 'http://ipqc.seuic.info/basic/web/smart_security/public/index.php/api/',
      tokenUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb280dffa14c0d7dd&redirect_uri=http%3a%2f%2fipqc.seuic.info%2fbasic%2fweb%2fsmart_security%2fpublic%2findex.php%2fapi%2fauth%2ftoken&response_type=code&scope=snsapi_base&state=123#wechat_redirect',
      imgUrl: 'http://www.sherlochao.com:9091/filebase',
      taskTypFlg: '', // 领取：0 执行 1
      indexConf: {
        isBack: true,  // 是否显示返回
        title: '菜单' // 标题
      }
    }
  },
  mutations: {
    changeIndexConf: (state, data) => {
      Object.assign(state.comm.indexConf, data);
    },
    isLogin: (state, data) => {
      localStorage.setItem('memberId', data.memberId);
      localStorage.setItem('userMsg', JSON.stringify(data));
      state.comm.login.memberId = localStorage.getItem('memberId');
      state.comm.login.userData = JSON.parse(localStorage.getItem('userMsg'));
    }
  }
});
export default store;
*/
