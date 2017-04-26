// vue自定义插件模块
import {
    ROOT_SERVER
} from './config'

export default{
    install(Vue){
        // Vue.prototype.$id = JSON.parse(sessionStorage.getItem('wx_info')).openid
      // 向Vue对象上添加方法，保存popup值
        Vue.prototype.savePopup = (value) => {
          //如果存在-新增，否则-创建
            if(sessionStorage.getItem('popupArr')){
              let tempArr = JSON.parse(sessionStorage.getItem('popupArr'))
              tempArr.push(value)
              sessionStorage.setItem('popupArr',JSON.stringify(tempArr))
            }else{
              let arr = [value]
              sessionStorage.setItem('popupArr',JSON.stringify(arr))
            }
        },
        Vue.prototype.removePopup = () =>{
          if(sessionStorage.getItem('popupArr')){
              let tempArr = JSON.parse(sessionStorage.getItem('popupArr'))
              tempArr.pop()
              sessionStorage.setItem('popupArr',JSON.stringify(tempArr))
            }
        },
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
        }
        // 存储错误信息格式:{"bindcard":{"bindError":"验证码错误"}}
        // 规则：如果没有则创建，有就更新
        Vue.prototype.setMsg=(url,name,msg)=>{
            if(sessionStorage.getItem(url) !== null){
                let Msg = JSON.parse(sessionStorage.getItem(url))
                Msg[name] = msg
                sessionStorage.setItem(url,JSON.stringify(Msg))
            }else{
                let Msg = {}
                Msg[name] = msg
                sessionStorage.setItem(url,JSON.stringify(Msg))
            }
        }
        // 获取错误信息
        Vue.prototype.getMsg=(url,name)=>{
            if(sessionStorage.getItem(url) !== null){
                let Msg = JSON.parse(sessionStorage.getItem(url))
                return Msg[name]
            }else{
                return null;
            }
        }

        // 回到顶部按钮
        Vue.prototype.backToTop = () => {
            var opt,__returnTopInterval,xEle,xBox;
            //x-return-top.js执行方法
            function xReturnTop() {
                __getOption();
                __addHtml();
                __addCss();
                //防止屏蔽已有的事件
                var oldOnscroll = window.onscroll;
                window.onscroll = function () {
                    if(typeof oldOnscroll == 'function'){
                        oldOnscroll.call(this);
                    }
                    __onWindowScroll(300);
                }; //卷动事件
                xEle.onclick = __animateReturnTop; //点击
                xBox.onmouseover = __onBoxMouseOver; //鼠标
                xBox.onmouseout = __onBoxMouseOut;
            }

            function __getElesByTag(name) {
                return document.getElementsByTagName(name)
            }

            function __getAttr(node, attrName, defaultValue) {
                return node.getAttribute(attrName) || defaultValue;
            }

            function __getOption() {
                var scripts = __getElesByTag("script"), script = scripts[scripts.length - 1];
                opt = {
                    l: __getAttr(script, "left", '86%'),
                    b: __getAttr(script, "bottom", '16%'),
                    t: __getAttr(script, "text", '返回顶部')
                }
            }

            function __onBoxMouseOut() {
                xBox.style.width = '36px';
            }

            function __onBoxMouseOver() {
                xBox.style.width = '36px';
            }

            function __getScrollTopOffset() {
                return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            }

            function __setScrollTopOffset(value) {
                if (document.body && document.body.scrollTop) {
                    document.body.scrollTop = value;
                }
                if (document.documentElement && document.documentElement.scrollTop) {
                    document.documentElement.scrollTop = value;
                }
            }

            function __animateHideXReturnTop() {
                xBox.style.bottom = '-60px';
            }

            //显示按钮动画
            function __animateShowXReturnTop() {
                xBox.style.bottom = opt.b;
            }

            function __scrollMove() {
                __setScrollTopOffset(__getScrollTopOffset() / 1.15);
                //滚动到最上面的时候，清除定时器
                if (__getScrollTopOffset() < 1) {
                    clearInterval(__returnTopInterval);
                    __returnTopInterval = null;
                }
            }
            function __animateReturnTop() {
                __onBoxMouseOut()
                __returnTopInterval = setInterval(__scrollMove, 10);//每10毫秒执行一次方法
            }

            function __onWindowScroll(distance) {
                if (__returnTopInterval == null) __getScrollTopOffset() > distance ? __animateShowXReturnTop() : __animateHideXReturnTop();
            }

            function __createNonde(tag) {
                return document.createElement(tag);
            }

            function __createText(t) {
                return document.createTextNode(t);
            }
            function __append(p, c) {
                p.appendChild(c);
            }

            function __addHtml() {
                xEle = __createNonde("div");
                xEle.id = 'xReturnTop';

                xBox = __createNonde("div");
                xBox.style.overflow = "hidden";

                var xA = __createNonde("a");
                xA.href = "javascript:void(0)";

                var xSpan = __createNonde("span");
                __append(xSpan, __createText(opt.t))

                __append(xBox, xA);
                __append(xBox, xSpan);
                __append(xEle, xBox);
                __append(__getElesByTag("body")[0], xEle);
            }

            function __addCss() {
                var x = document.createElement("div"),
                    cssStr = "#xReturnTop{font-size:12px;position:fixed;}#xReturnTop div,#xReturnTop div a{-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;width:36px;height:36px;display:block;}#xReturnTop div{transition:0.3s;position:fixed;left:"+opt.l+";bottom:-60px;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkAQMAAADbzgrbAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURQAAAKd6PdoAAAABdFJOU1wiO8W5AAAADElEQVQI12NgGJ4AAADYAAHoUyD/AAAAAElFTkSuQmCC') repeat;cursor:pointer;}#xReturnTop div a{float:left;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARAQMAAAA4xGTiAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAGUExURQAAAP///6XZn90AAAABdFJOUwBA5thmAAAAJ0lEQVQI12P4/48BiCCAkYGBuYGB/QAD/wMG+Q8M9j8Y6v+AuKgIAH0DDqBH4KCCAAAAAElFTkSuQmCC') no-repeat 11px 10px;}#xReturnTop div a:hover{background-color:#6e6e6e;}#xReturnTop div span{float:left;line-height:36px;color:#e6e6e6;margin-left:6px;}";
                x.innerHTML = "x<style>"+cssStr+"</style>";
                __append(__getElesByTag("head")[0], x.lastChild);
            }
            xReturnTop();
        }

        // 点击页面跳转
        Vue.prototype.skipUrl=(params)=>{
            if(sessionStorage.getItem('bankIndex') !== null){
                let Msg = JSON.parse(sessionStorage.getItem('bankIndex'))
                let userauth = parseInt(Msg.userInfo.regStatus)
                let auth = parseInt(params.auth)
                if(userauth>=auth){
                    if(params.link_url!=''){
                        location.href=params.link_url
                    }
                }else{
                    location.href=BIND_PATH
                }
            }
        }

        //点击获取更多活动
        Vue.prototype.getMoreActivity=(params)=>{
            if(params.link_url!=''){
                location.href=params.link_url
            }
        }

        //判断对象是否为空
        Vue.prototype.isEmptyObject = (e) =>{
            var t;
            for (t in e)
                return !1;
            return !0
        }

        //配置微信jssdk
        Vue.prototype.configWxjssdk = () =>{
            let wx_info = JSON.parse(sessionStorage.getItem('wx_info'))
            configWxSdk(wx_info)

            function configWxSdk(wxConfig){
                wx.config({
                    debug: false,
                    appId: wxConfig.appid,
                    timestamp: parseInt(wxConfig.timestamp),
                    nonceStr: wxConfig.nonce,
                    signature: wxConfig.signature,
                    jsApiList: [
                        'getLocation',
                        'chooseImage',
                        'scanQRCode',
                        'hideMenuItems'
                    ]
                });
            }
        }
    }
}
