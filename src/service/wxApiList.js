// 微信相关sdk封装

// 微信配置
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
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
			'onMenuShareWeibo',
			'onMenuShareQZone',
            'hideMenuItems'
        ]
    });
}

export function configWxjssdk(){
	let wx_info = JSON.parse(sessionStorage.getItem('wx_info'))
    configWxSdk(wx_info)
}

// 关闭
export function hideMenus(){
	let menu = [/*'menuItem:favorite','menuItem:share:facebook',
			'menuItem:share:brand','menuItem:openWithSafari',
			'menuItem:openWithQQBrowser','menuItem:share:email'*/] 
                wx.hideMenuItems({
                    menuList:menu
                })
}

// 分享朋友圈
export function shareTimeline(option){
    wx.onMenuShareTimeline({
        title: option.title, // 分享标题
        link: option.link, // 分享链接
        imgUrl: option.imgUrl, // 分享图标
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
}


// 分享微信好友
export function shareAppMessage(option){
    wx.onMenuShareAppMessage({
        title: option.title, // 分享标题
        desc: option.desc, // 分享描述
        link: option.link, // 分享链接
        imgUrl: option.imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
}

// 分享给QQ好友
export function shareQQMessage(option){
	wx.onMenuShareQQ({
	    title: option.title, // 分享标题
	    desc: option.desc, // 分享描述
	    link: option.link, // 分享链接
	    imgUrl: option.imgUrl, // 分享图标
	    success: function () { 
	       // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	       // 用户取消分享后执行的回调函数
	    }
	});
}

// 分享到腾讯微博
export function shareTxWeibo(option){
	wx.onMenuShareWeibo({
	    title: option.title, // 分享标题
	    desc: option.desc, // 分享描述
	    link: option.link, // 分享链接
	    imgUrl: option.imgUrl, // 分享图标
	    success: function () { 
	       // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
}

// 分享到空间
export function shareQZone(option){
	wx.onMenuShareQZone({
	    title: option.title, // 分享标题
	    desc: option.desc, // 分享描述
	    link: option.link, // 分享链接
	    imgUrl: option.imgUrl, // 分享图标
	    success: function () { 
	       // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
}
