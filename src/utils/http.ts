import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../config/constant';
import { getToken } from './auth';
import { useUserStoreWithOut } from '../store/modules/user';
import { useMessage } from '../hooks/useMessage';
// import { WhiteList } from './permission';
// import { usePermissioStoreWithOut } from '/@/store/modules/permission';

const { createMessage } = useMessage();
// baseURL
const BASE_URL = API_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    // 接口权限拦截
    // const store = usePermissioStoreWithOut();
    // const { url = '' } = config;
    // if (!WhiteList.includes(url) && store.getIsAdmin === 0) {
    //   if (!store.getAuths.includes(url)) {
    //     console.log('url', url, store.getIsAdmin);
    //     return Promise.reject('没有操作权限');
    //   }
    // }

    // 请求头 token配置
    const token = getToken();

    if (token) {
      console.info('token', token);
      config.headers = {
        ...config.headers,
        Authorization: token,
      };
      // config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.info(res, 'res.result');
    // 正确状态
    if (!res.ErrorMsg) {
      return res || true;
    }
    // 登录失效
    if (!res) {
      useUserStoreWithOut().logout();
    }
    // 异常
    createMessage.error(res.ErrorMsg);
    return undefined;
  },
  (error) => {
    console.log('err', error);
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          createMessage.error(error.response.ErrorMsg || '参数错误');
          break;
        case 401:
          createMessage.error('未授权，请重新登录(401)');
          break;
        case 403:
          createMessage.error('拒绝访问(403)');
          break;
        case 404:
          createMessage.error('请求出错(404)');
          break;
        case 408:
          createMessage.error('请求超时(408)');
          break;
        case 500:
          createMessage.error('服务器错误(500)');
          break;
        case 501:
          createMessage.error('服务未实现(501)');
          break;
        case 502:
          createMessage.error('网络错误(502)');
          break;
        case 503:
          createMessage.error('服务不可用(503)');
          break;
        case 504:
          createMessage.error('网络超时(504)');
          break;
        case 505:
          createMessage.error('HTTP版本不受支持(505)');
          break;
        default:
          createMessage.error('连接出错');
      }
    } else {
      createMessage.error('连接服务器失败!');
    }
  },
);

const request = <T = any>(
  config: AxiosRequestConfig | string,
  options?: AxiosRequestConfig,
): Promise<T> => {
  if (typeof config === 'string') {
    if (!options) {
      return instance.request<T, T>({
        url: config,
      });
      // throw new Error('请配置正确的请求参数');
    } else {
      return instance.request<T, T>({
        url: config,
        ...options,
      });
    }
  } else {
    return instance.request<T, T>(config);
  }
};

export function get<T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' }, options);
}

export function del<T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'DELETE' }, options);
}
export function put<T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'PUT' }, options);
}

// export function getUrl<T = any>(
//   config: AxiosRequestConfig,
//   options?: AxiosRequestConfig,
// ): Promise<T> {
//   // 复制一份 config 对象，避免修改原始对象
//   const newConfig = { ...config };
//   if (newConfig.params) {
//     const searchParams = new URLSearchParams();
//     for (const [key, value] of Object.entries(newConfig.params)) {
//       searchParams.append(key, String(value));
//     }
//     // 如果 URL 中已经有查询字符串，使用 & 连接
//     if (newConfig.url?.includes('?')) {
//       newConfig.url += `&${searchParams.toString()}`;
//     } else {
//       newConfig.url += `?${searchParams.toString()}`;
//     }
//     // 移除 params 对象，避免 axios 再次处理
//     delete newConfig.params;
//   }
//   return request({ ...newConfig, method: 'GET' }, options);
// }
// 封装 getUrl（确保内部使用 params）
// export function getUrl<T>(config: { url: string; params?: Record<string, any> }) {
//   return axios.get<T>(config.url, {
//     params: config.params,
//     paramsSerializer: (params) => {
//       return qs.stringify(params, { arrayFormat: 'brackets' }); // 自定义序列化
//     },
//   });
// }

export function post<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  return request({ ...config, method: 'POST' }, options);
}

export default request;
export type { AxiosInstance, AxiosResponse };
