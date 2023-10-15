import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const baseURL = "http://localhost:8080";

export const httpClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

type ApiServiceType = {
  registrarToken: (token: string) => void;
  post: <T>(url: string, objeto: any) => Promise<AxiosResponse<T>>;
  put: <T>(url: string, objeto: any) => Promise<AxiosResponse<T>>;
  delete: <T>(url: string) => Promise<AxiosResponse<T>>;
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
};

const ApiService = (apiurl: string): ApiServiceType => {
  const registrarToken = (token: string) => {
    if (token) {
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };

  const post = <T>(url: string, objeto: any): Promise<AxiosResponse<T>> => {
    const requestUrl = `${apiurl}${url}`;
    return httpClient.post<T, AxiosResponse<T>>(requestUrl, objeto);
  };

  const put = <T>(url: string, objeto: any): Promise<AxiosResponse<T>> => {
    const requestUrl = `${apiurl}${url}`;
    return httpClient.put<T, AxiosResponse<T>>(requestUrl, objeto);
  };

  const _delete = <T>(url: string): Promise<AxiosResponse<T>> => {
    const requestUrl = `${apiurl}${url}`;
    return httpClient.delete<T, AxiosResponse<T>>(requestUrl);
  };

  const get = <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const requestUrl = `${apiurl}${url}`;
    return httpClient.get<T, AxiosResponse<T>>(requestUrl, config);
  };

  return {
    registrarToken,
    post,
    put,
    delete: _delete,
    get,
  };
};

export default ApiService;
