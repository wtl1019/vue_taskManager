import * as types from '../type'
import * as api from '../../fetch/commonApi'
/**
 * App通用配置
 */
const state = {
    loading: false,
    showToast: false,
    leftNavStatus: false,
    showSuccess: true,
	  showFail: false,
    toastMsg: '操作成功',
    showTimePicker: false,
    alertMsg: '退出登录',
    showAlert: false,
    apiUrl: 'http://ipqc.seuic.info/basic/web/smart_security/public/index.php/api/',
    taskTypFlg: '',// 领取：0 执行 1
    wxCode: '',
    token: '',
    indexConf: {
      isBack: true,  // 是否显示返回
      title: '菜单' // 标题
    },
    taskAddress: {
      name: '',
      lat: '',
      lon:''
    }
}

const actions = {
    setLoadingState({ commit }, status) {
      commit(types.COM_LOADING_STATUS, status)
    },
    setNavState({ commit }, status) {
      commit(types.COM_NAV_STATUS, status)
    },
    showToast({ commit }, status) {
      commit(types.COM_SHOW_TOAST, status)
    },
    showSuccess({ commit }, status) {
      commit(types.COM_SHOW_SUCCESS, status)
    },
    showFail({ commit }, status) {
      commit(types.COM_SHOW_FAIL, status)
    },
    toastMsg({ commit }, str) {
      commit(types.COM_TOAST_MSG, str)
    },
    showAlert({ commit }, status) {
      commit(types.COM_SHOW_ALERT, status)
    },
    alertMsg({ commit }, str) {
      commit(types.COM_ALERT_MSG, str)
    },
    showTimePicker({ commit }, status) {
      commit(types.COM_SHOW_TIME_PICKER, status)
    },
    changeIndexConf({ commit }, params) {
      commit(types.INDEX_CONF, params);
    },
    setWxCode({ commit }, str) {
      commit(types.WXCODE, str)
    },
    clearWxCode({ commit }, str) {
      alert('clearWxCode');
      localStorage.removeItem('wxCode', str)
      commit(types.WXCODE, str);
    },
    setToken({ commit }, str) {
      commit(types.TOKEN, str)
    },
    getToken({ commit }, str) {
      api.getTokenSer(str)
        .then(res => {
          alert('store.getToken方法value:'+ res);
          let token = res;
          alert('token:'+res);
          commit(types.TOKEN, token)
      })
    },
    setAddress({ commit }, params) {
      commit(types.TASK_ADDRESS, params);
    }
}

const getters = {
    loading: state => state.loading,
    showToast: state => state.showToast,
    showAlert: state => state.showAlert,
    title: state => state.indexConf.title,
    isBack: state => state.indexConf.isBack,
    taskTypFlg: state => state.taskTypFlg,
    apiUrl: state => state.apiUrl,
    wxCode: state => state.wxCode,
    token: state => state.token,
    taskAddress: state => state.taskAddress
}


const mutations = {
    [types.COM_LOADING_STATUS](state, status) {
        state.loading = status
    },

    [types.COM_SHOW_TOAST](state, status) {
        state.showToast = status
    },

    [types.COM_SHOW_SUCCESS](state, status) {
        state.showSuccess = status
    },

    [types.COM_SHOW_FAIL](state, status) {
        state.showFail = status
    },

    [types.COM_TOAST_MSG](state, str) {
        state.toastMsg = str
    },

    [types.COM_NAV_STATUS](state, status) {
        state.leftNavStatus = status
    },

    [types.COM_SHOW_TIME_PICKER](state, status) {
        state.showTimePicker = status
    },

    [types.COM_SHOW_ALERT](state, status) {
        state.showAlert = status
    },
    [types.COM_ALERT_MSG](state, str) {
        state.alertMsg = str
    },
    [types.INDEX_CONF](state, params) {
        state.indexConf = params
    },
    [types.WXCODE](state,str) {
      state.wxCode = str
    },
    [types.TOKEN](state,str) {
      state.token = str
    },
    [types.TASK_ADDRESS](state,params) {
      state.taskAddress = params
    }
}


export default {
    state,
    actions,
    getters,
    mutations
}
