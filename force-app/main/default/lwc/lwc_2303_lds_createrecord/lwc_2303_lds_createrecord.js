import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
export default class Lwc_2303_lds_createrecord extends LightningElement
 {
     name;
     phone;
     nameme(event)
     {
         this.name=event.target.value;

     }
     phoneme(event)
     {
        this.phone=event.target.value;
     }
     clickme(event)
     {
        const fields={'Name':this.name, 'Phone':this.phone};
        const recordData={apiName:'Account',fields};
        createRecord(recordData).then(respons=>
            {
             alert('account create success with Account id' + respons.id);
        }).catch(error=>{
            alert('account creation faild'+error.body.message);
        });
     }
 }