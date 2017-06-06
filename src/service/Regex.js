export const RegexList={
	code:/^[0-9]{6}$/,
	cardNo:/^$|^[0-9]{16,19}$/
}

export function checkReg(info,reg){
	let re = new RegExp(reg)
	if(re.test(info)){

		return true
	}else{
		return false
	}
}