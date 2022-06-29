import axios from 'axios'
import { Message } from 'element-ui'

export const baseURL = 'https://contactbc.onrender.com'

axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true

axios.interceptors.request.use((config) => {
    return config
})

axios.interceptors.response.use(
    (res) => {
        if (res.data.code === -1) {
            Message.error(res.data.msg)
            if (res.data.msg === '需要登录') {
                window.location.replace('/login')
            }
            return Promise.reject(res)
        }
        return Promise.resolve(res.data.data)
    },
    (err) => {
        if (err?.data?.msg) {
            Message.error(err.data.msg)
            if (err.data.msg === '需要登录') {
                window.location.replace('/login')
            }
            return Promise.reject(err)
        }
        Message.error(err.message)
        return Promise.reject(err)
    }
)

export const ApiGet = (path, params, config) => {
    return axios.get(path, {
        params,
        ...config,
    })
}

export const ApiPost = (path, data, config) => {
    return axios.post(path, data, config)
}
