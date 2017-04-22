import axios from 'axios'
import qs from 'qs'

import * as _ from '../util/tool'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '你的接口地址';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
     _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(!res.data.success){
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    _.toast("网络异常", 'fail');
    return Promise.reject(error);
});

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export default {
    /**
     * 完成任务
     */
    Complete(params) {
        return fetch('tasks/complete', params)
    },


    SportsList() {
        return fetch('/api/sportList')
    },


    TravelsList() {
        return fetch('/api/travelList')
    },


    SportsDetail(id) {
        return fetch('/api/sportDetail', {sportId: id})
    },


    TravelsDetail(id) {
        return fetch('/api/travelDetail', {travelId: id})
    },


    travelClicks(id) {
        return fetch('/api/travelClickNum', {travelId: id})
    },


    UserInfo(id) {
        return fetch('/users/api/userInfo', {userId: id})
    },


     getPubTotravelNum(id) {
         return fetch('/users/api/getPubTotravelNum', {userId: id})
     },


    getMyTravel(id) {
          return fetch('/users/api/myTravel', {userId: id})
      },


    PostTravel(params) {
        return fetch()
    },


     getAddressJson() {
         return fetch('/api/address')
     }
}
