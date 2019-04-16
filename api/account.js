//所有账号部分接口请求，封装

//引入request
import request from '../src/utils/request';
//添加账号
export function addAccount(url, params) {
    return new promise((resolve, reject) => {
        request.post(url, params)
            .then(res => {
                resolve(res) //数据成功
            })
            .catch(err => {
                reject(err) //错误信息
            })
    })
}