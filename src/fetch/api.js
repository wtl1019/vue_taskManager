import axios from 'axios'
import qs from 'qs'

import * as _ from '../util/tool'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://ipqc.seuic.info/basic/web/smart_security/public/index.php/api/';

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
    if(res.data.respCode != "0000"){
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
        axios.get(url, params)
            .then(response => {
              resolve(response);
            }, err => {
              alert('err:'+err);
              reject(err);
            })
            .catch((error) => {
              alert('catch error');
              reject(error)
            })
    })
}

export default {

    fetchTasks(url) {
        return fetch(url)
    },
    fetchToken(url) {
        return fetch(url)
    },
    getWXConfig(url) {
      return fetch(url)
    },
    /**
     * 完成任务
     */
    CompleteTask(url,params) {
        return fetch(url, params)
    }
}
