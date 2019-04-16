//工具函数
//验证密码
export function passwordReg(val) {
    const reg = /^[a-zA-Z]\w{2,5}$/;
    return reg.test(val)
}