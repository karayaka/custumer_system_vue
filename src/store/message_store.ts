import {reactive } from 'vue'

const store=({
    state:reactive({
        messages:[] as string[],
        showMessage:false as boolean,
    }),
    mutations:{
        showMessages(messag:string[]){
            store.state.messages=messag;
            store.state.showMessage=true;
        },
        showMessage(messag:string){
            store.state.messages.push(messag);
            store.state.showMessage=true;
        },
        hideMessage(){
            store.state.showMessage=false;
        },
        prepareApiError(datas:any){
            const messages=[];
            for (let index = 0; index < datas.length; index++) {
                const element = datas[index];
                for (let i = 0; i < element.values.length; i++) {
                    const vl = element.values[i];
                    messages.push(vl);
                }
            }
            this.showMessages(messages);
        }
    }
})

export default store;