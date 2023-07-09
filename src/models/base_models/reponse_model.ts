export default interface ResponseModel<T>{
    resultDate:Date
    data:T
    message:string|any
}