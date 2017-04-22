// 任务相关api
import Vue from 'vue'
import axios from 'axios'
import {
	API_ROOT
} from '../js/config'


// 领取任务
export function ReciveTask(data){
  return new Promise((resolve,reject) => {
    axios({
      method:'post',
      url:API_ROOT+'tasks/detect//get',
      data:{
        taskId:data.taskId,
        userId:data.userId,
        deviceNo:data.deviceNo,
        state:data.state,
        orgnization:data.orgnization
      }
    }).then((resp) =>{
      resolve(resp)
    },reject)
  })
}

// 下单
export function GoldBooking(data){
	return new Promise((resolve,reject)=>{
		axios({
			method:'post',
			url:API_ROOT+'/weiStore/GoldBooking',
			data:{
				openid:data.openid,
				areaCode:data.areaCode,
				productCode:data.productCode,
				productSubCode:data.productSubCode,
				num:data.num,
				isSelf:data.isSelf,
				bank:data.bank,
				quittanceType:data.quittanceType,
				quittanceTitle:data.quittanceTitle,
				contactPhone:data.contactPhone,
				getterPhone:data.getterPhone,
				getterName:data.getterName,
				getterIdCardNum:data.getterIdCardNum,
				appointmentExchangeDate:data.appointmentExchangeDate,
				salesMode:data.salesMode,
				paymentWay:data.paymentWay,
				remark:data.remark,
				code:data.code,
				total:data.total
			}
		}).then((resp) =>{
			resolve(resp)

		},reject)
	})
}

