import { LightningElement,wire } from 'lwc';
import getupcon from '@salesforce/apex/cl_3003_wireGETupdate.getupcon';
import {refreshApex} from '@salesforce/apex'
import { updateRecord } from 'lightning/uiRecordApi';
import FirstName_field from '@salesforce/schema/Contact.FirstName';
import LastName_field from '@salesforce/schema/Contact.LastName';
import id_field from '@salesforce/schema/Contact.Id';
const CONS=[

    {label:'First Name' ,fieldName:'FirstName' ,editable:true},
    {label:'Last Name' ,fieldName:'LastName' ,editable:true},
    {label:'Email' ,fieldName:'Email' ,editable:true},
    {label:'Phone' ,fieldName:'Phone' ,editable:true},

];
export default class Lwc_3003_lds_getupdate extends LightningElement 
{
    colum=CONS;
    draftvalues;
    @wire(getupcon) murali;
    saveme(event)
    {
        const fields={};
        fields[id_field.fieldApiName]=event.detail.draftvalues[0].Id;
        fields[FirstName_field.fieldApiName]=event.detail.draftvalues[0].FirstName;
        fields[LastName_field.fieldApiName]=event.detail.draftvalues[0].LastName;
        const recordInput ={fields};
        updateRecord(recordInput).then(response=>{}).catch(error=>{})

    }
}