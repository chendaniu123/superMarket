//对axious进行封装
//引入axious
import axios from 'axios'
//引入local
import local from '@/utils/local'
//引入jq
import qs from 'qs'


// 设置请求的服务器根目录
axios.defaults.baseURL = 'http://172.16.11.197:5000';
//axious请求拦截器
axios.interceptors.request.use(config => {
    // 获取token
    const token = local.get('x_h_l_x_d_c666');
    config.headers.authorization = `Bearer ${token}`
    return config;
})

//暴露
export default {
    //get方式
    get(url, params = {}) {
        //返回promise
        return new Promise((resolve, reject) => {
            //axious请求
            axios.get(url, { params })
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                    reject(err)
                })
        })

    },
    //post方式
    post(url, params = {}) {
        //返回promise
        return new Promise((resolve, reject) => {
            //axious请求
            axios.post(url, qs.stringify(params))
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}