// Utilities
import { defineStore } from 'pinia'
import CustomerListModel from '@/models/customer_models/customer_list_model'
import CustomerService from '@/services/customer_service'
export const useAppStore = defineStore('app', {
  state: () => ({
    formValid:false as boolean,
    id:"" as string,
    saveButtonLoading:false as boolean,
    deletLoading:false as boolean,
    formLoading:false as boolean,
    tableLoading:false as boolean,
    customers: [] as CustomerListModel[],
    customer:{} as CustomerListModel,
    q:"" as string,
    showDialog:false as boolean,
    nameRules: [
      value => {
        if (value) return true

        return 'Bu Alan Zorulu'
      },
    ],
    emailRules: [
      value => {
        if (value) return true

        return 'Email Zorunlu Alan'
      },
      value => {
        if (/.+@.+\..+/.test(value)) return true

        return 'Geçerli Bir Email Girin'
      },
    ],
    tcknRules:[
      value => {
        if (value) return true

        return 'TCKN Zorunludur'
      },
      value => {
        if (value?.length == 11) return true

        return 'Kimlik Numarası 11 karakter olmalıdır'
      },
    ]
  }),
  actions:{
    async getCustomer(){
      
      this.tableLoading=true;
      this.customers= await CustomerService.getCustomers(this.q);
      this.tableLoading=false;
      console.log(this.customers);
    },
    setShowDialog(){
      this.showDialog=true;
    },
    async updateCustomer(id:string){
      this.id=id;
      this.showDialog=true;
      this.formLoading=true
      this.customer=await CustomerService.getCustomer(id);
      const dates=this.customer.birthDate.split("T");
      this.customer.birthDate=dates[0];
      console.log(this.customer);
      this.formLoading=false;
    },
    setCloseDialog(){
      this.resetForm(),
      this.showDialog=false;
    },
    async saveCustomer(){
      console.log(this.formValid);
      if(this.formValid!=false){
        this.saveButtonLoading=true;
        await CustomerService.saveCustomer(this.customer);
        this.saveButtonLoading=false;
        this.showDialog=false;
        this.resetForm();
      }
    },
    async deleteCustomer(id:string){
      this.deletLoading=true;
      await CustomerService.deleteCustomer(id);
      this.deletLoading=false;
      this.getCustomer();
    },
    resetForm(){
      this.customer={
        id:"",
        tckn:"",
        name:"",
        surname:"",
        email:"",
        birthDate: "1900-01-01",
      };
    }
  }

})
