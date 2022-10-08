import { AxiosRequestConfig, AxiosResponse } from 'axios';
declare class Request {
    private instance;
    constructor(hookURL: string);
    initAxiosInstance(): void;
    get(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any> | string>;
    post(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any> | string>;
}
export default Request;
