// 顶层结构相关api
import Vue from 'vue'
import axios from 'axios'
import {
    ROOT_SERVER
} from '../common/js/config'

/*获取服务端token*/
export function getTokenSer(wxCode) {
  alert(1)
  return new Promise((resolve, reject) => {
    let urlSer = ROOT_SERVER + 'auth/token?code='+wxCode;
    alert(urlSer);
    axios.get(urlSer)
      .then(function (response) {
        alert(2);
        alert(response);
      })
      .catch(function (error) {
        alert(3);
        alert(error);
      });
    /*axios({
      method:'get',
      url:ROOT_SERVER + 'auth/token?code='+wxCode
    }).then(response => {
          alert(2)
          resolve(response.data);
    }, err => {
          alert(3)
          reject(err);
    })
    .catch((error)=> {
        alert('cuo')
        reject(error);
      })*/
    })
}

// 微信网页授权获取opneid
export function getWXInfo(body){
    return new Promise((resolve,reject) => {
        axios({
            method:'get',
            url:ROOT_SERVER+'weixin/QryOpenid',
            params:{
                appid:body.appid,
                code:body.code
            }
        }).then((resp) =>{
            resolve(resp)
        },reject)
    })
}
