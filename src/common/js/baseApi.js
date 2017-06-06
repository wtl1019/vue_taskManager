// 顶层结构相关api
import Vue from 'vue'
import axios from 'axios'
import {
	ROOT_SERVER
} from './config'

/*获取微信配置*/
export function getWXConfig(url) {
  return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(resp => {
                resolve(resp);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

//获取城市信息
export function getCity(body){
	return new Promise((resolve, reject) => {
		axios({
			method:'post',
			url:API_ROOT+'weixin/QryCity',
			data:{
				lat:body.lat,
				lng:body.lng
			}
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}



// 微信网页授权获取opneid
export function getWXInfo(body){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:API_ROOT+'weixin/QryOpenid',
			params:{
				appid:body.appid,
				code:body.code
			}
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}

// 获取城市信息
export function getCityInfo(){
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:'./static/json/cityList.json'
		}).then((resp) =>{
			resolve(resp)
		},reject)
	})
}

