import axios, { AxiosInstance } from "axios";
import messageStore from '@/store/message_store'

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://localhost:7294/api",
  headers: {
    "Content-type": "application/json",
    //token burda eklenmeli
  },
});

apiClient.interceptors.response.use((response) =>{
  return response.data;//datalar burda verirliyor
},(error=>{
  console.log(error);//hata mesajarı burda yönetilrcek
  messageStore.mutations.prepareApiError(error.response.data)
}))

export default apiClient;