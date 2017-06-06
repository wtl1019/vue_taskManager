// httpInterceptor
import { Indicator,MessageBox } from 'mint-ui';
import axios from 'axios';
import {
    API_ROOT
} from '../config'
var loadingTimer = null

//不拦截的请求名
const unInterceptorUrl = ['checkAndBindCard','GoldBooking']

//不弹loading的请求名
const unLoadingUrl = ['GetProductList','GetOrderList']

// 请求loading对应提示
// const loadingInfo = {'sendCode':'获取验证码中...'}
// function changeInfo(config){
//     let arr = resp.url.split('/'),info = '拼命加载中...'
//     Object.keys(loadingInfo).forEach(url=>{
//         info = loadingInfo[url]
//     })
//     return info
// }

// 检测请求名是否需要拦截
function checkUrl(resp){
    let arr = resp.config.url.split('/'),flag = true
    unInterceptorUrl.forEach(item=>{
        if(item === arr[arr.length-1]){
            flag = false
        }
    })
    return flag
}

function checkLoadUrl(resp){
    let arr = resp.url.split('/'),flag = true
    unLoadingUrl.forEach(item=>{
        if(item === arr[arr.length-1]){
            flag = false
        }
    })
    return flag
}

// todo 拦截错误请求并发送日志
function sendErrorLog(log,result){
    var beacon = new Image();
    if(result!==0){
        beacon.src = API_ROOT+'weixinservice/frontlog?msg='+log+'&error=1'
    }else{
        beacon.src = API_ROOT+'weixinservice/frontlog?msg='+log
    }
    
}

export const request = function(config){
    if(checkLoadUrl(config)){
        Indicator.open({
            text: '拼命加载中...',
            spinnerType: 'fading-circle'
        });
    }
    
    //本地测试需要注释掉
    if(JSON.parse(sessionStorage.getItem('wx_info')).token){
        let token = JSON.parse(sessionStorage.getItem('wx_info')).token
        config.headers.token = token
    }
    return config
	
}

export const response = function(response){
    sendErrorLog('msg:'+response.data.msg+'url:'+response.config.url+'data:'+JSON.stringify(response.config.data),response.data.result)
    if(response.data.result == 401 && checkUrl(response)){
        MessageBox.alert('会话超时，请重新进入').then(action => {
            WeixinJSBridge.invoke('closeWindow', {}, function (res) {});
        });
    }
    if(response.data.result!==0&&response.data.result != 401&&checkUrl(response)){
        MessageBox.alert(response.data.msg)
    }
	clearTimeout(loadingTimer);
    loadingTimer = setTimeout(()=>{
        Indicator.close();
        clearTimeout(loadingTimer);

    }, 300);
    return response;
    
}

export const respErr = (error) =>{
    // console.log(error.response)
    // if (error.response) {
    //     switch (error.response.status) {
    //         case 401:
    //             sendErrorLog('status'+error.response.status+'url:'+error.response.config.url+'msg:'+error.response.data.msg+'data:'+JSON.stringify(error.response.config.data),401)
    //             alert(error.response.data.msg)
    //     }
    // }
    // clearTimeout(loadingTimer);
    // loadingTimer = setTimeout(()=>{
    //     Indicator.close();
    //     clearTimeout(loadingTimer);

    // }, 300);
    // return Promise.reject(error.response)   // 返回接口返回的错误信息
}