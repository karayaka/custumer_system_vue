import CustomerListModel from '@/models/customer_models/customer_list_model';
import BaseService from '@/services/base_service'

class CustomerService extends BaseService {
    async getCustomers(q:string):Promise<CustomerListModel[]>{
      const models=await this.getAll<CustomerListModel[]>("/customer",{q:q});
      return models.data;
    }
    async saveCustomer(data:CustomerListModel):Promise<any>{
      await this.post("/customer",data);
    }
    async getCustomer(id:string):Promise<CustomerListModel>{
      const model= await this.get<CustomerListModel>("/customer",id);
      return model.data;
    }
    async deleteCustomer(id:string):Promise<any>{
      await this.delete("/customer",id);
    }
}
export default new CustomerService();