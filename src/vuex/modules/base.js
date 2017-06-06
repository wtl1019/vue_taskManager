// 根级别全局信息
import api from '../../fetch/api';

// 全局基础模块
const state = {
	wxconfig:{},
	wxInfo:{},//包含openid等信息
}

const actions = {
	FETCH_WX_CONFIG:({commit,state},url) => {
		return api.getWXConfig(url)
			.then(res=>{
				let Data = res.data.data
				commit('SET_WX_CONFIG',{Data})
			})
	}/*,
	FETCH_WX_INFO:({commit,state},body) => {
		return api.getWXInfo(body)
			.then(resp=>{
				let Data = resp.data.data
				commit('SET_WX_INFO',{Data})
			})
	}*/
}

const mutations = {
	SET_WX_CONFIG:(state,{Data}) => {
		state.wxconfig = Data
	},
	SET_WX_INFO:(state,{Data}) => {
		state.wxInfo = Data
	}
}

const getters = {
	activeWXConfig(state){
		return state.wxconfig
	},
	activeWXInfo(state){
		return state.wxInfo
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
