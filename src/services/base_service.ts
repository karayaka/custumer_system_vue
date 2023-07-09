import http from '@/api'
import ResponseModel from '@/models/base_models/reponse_model';

export default class BaseService{

      public getAll<T>(url:string,params:any): Promise<ResponseModel<T>> {
        return http.get(url,{params:params});
      }
      public get<T>(url:string,id: any): Promise<ResponseModel<T>> {
        return http.get(url+'/'+id);
      }
    
      public post<T>(url:string,data: any): Promise<ResponseModel<T>>{
        return http.post(url, data);
      }
    
      put(id: any, data: any): Promise<any> {
        return http.put(`/tutorials/${id}`, data);
      }
    
      delete<T>(url:string,id: any): Promise<ResponseModel<T>> {
        return http.delete(url+'/'+id);
      }
}