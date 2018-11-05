import config from '../constants/config';
import { icon_type, http_method } from "../constants/constant";
import tip from './tip';

const queryParams = params => {
    let str = '';
    Object.keys(params).forEach(key => str += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}&`);
    return str;
};

/**
 * 基础请求方法
 * @param api 接口地址，接口前不需要/
 * @param method 请求方法类型，get/post
 * @param header 请求头
 * @param params 请求参数
 * @param sucFunc 服务器有返回后的回调函数
 */
const req = (api, method, header, params) => {
    tip.showLoading('加载中...');
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${config.base_url}${api}?${queryParams(params)}`,
            method: method,
            header: header,
            data: params,
            success: res => {
                tip.hideLoading();
                if (res.data.code === config.return_code.fail) {
                    tip.showToast(res.data.msg, icon_type.none, 1000);
                }
                resolve(res.data);
            },
            fail: err => {
                tip.hideLoading();
                tip.showToast("网络连接超时", icon_type.none, 1000);
                reject(err);
            }
        });
    });
};

/**
 * 获取请求头数据
 * @param methodType 请求方法类型
 * @returns {*}
 */
const getHeader = methodType => {
    const head_data = '';

    return {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization": head_data
    }
};

/**
 * get 请求
 * @param api
 * @param params
 * @param sucFunc
 */
const get = (api, params) => {
    return req(api, http_method.get, getHeader(http_method.get), params);
};

/**
 * post 请求
 * @param api
 * @param params
 * @param sucFunc
 */
const post = (api, params) => {
    return req(api, http_method.post, getHeader(http_method.post), params);
};

const put = (api, params) => {
    return req(api, http_method.put, getHeader(http_method.post), params);
};

const del = (api, params) => {
    return req(api, http_method.del, getHeader(http_method.post), params);
};

export { get, post, put, del };