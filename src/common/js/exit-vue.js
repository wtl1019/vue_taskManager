// vue自定义插件模块
import {
    ROOT_SERVER
} from './config'


export default{
    install(Vue){
        Vue.prototype.back=()=>{
            history.back()
        },
        //字符串到head位置以及从end开始不遮盖，中间变为*，
        //若head到了end位置之后，则return value
        Vue.prototype.starcover=(value,start,end)=>{
            if(start+end>value.length){
                return value
            }else{
                if(start<0){start = 0}
                if(end<0){end = 0}
                let arrl = value.substr(0,start)
                let arr2 = value.substr(value.length-end)
                let arr3 = ''
                for(let i = 0;i<value.length-(start+end);i++){
                    arr3+='*'
                }
                return arrl+arr3+arr2
            }
        },

        //配置微信jssdk
        Vue.prototype.configWxjssdk = (wx_info) =>{
            configWxSdk(wx_info);
            alert('wxConfig.appId:'+wxConfig.appId);
            function configWxSdk(wxConfig){
                wx.config({
                    debug: false,
                    appId: wxConfig.appId,
                    timestamp: parseInt(wxConfig.timestamp),
                    nonceStr: wxConfig.nonceStr,
                    signature: wxConfig.signature,
                    jsApiList: [
                        'getLocation',
                        'chooseImage',
                        'scanQRCode',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'hideMenuItems'
                    ]
                });
            }
        }
    }
}
