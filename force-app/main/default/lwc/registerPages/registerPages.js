import { LightningElement,api,track,wire} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { createRecord } from 'lightning/uiRecordApi';
import Registration from  '@salesforce/schema/Registration__c';
import Name_Field from '@salesforce/schema/Registration__c.Name';
import UserName_Field from '@salesforce/schema/Registration__c.username__c';
import password_Field from '@salesforce/schema/Registration__c.password__c';
import phone_Field from '@salesforce/schema/Registration__c.phoneno__c';
import email_Field from '@salesforce/schema/Registration__c.Email__c';
import company_Field from '@salesforce/schema/Registration__c.compant_name__c';
import securoty from '@salesforce/schema/Registration__c.Security_quations__c';
import securoty_Field from '@salesforce/schema/Registration__c.native_place__c';
import securotys_Field from '@salesforce/schema/Registration__c.Your_First_Company__c';
export default class RegisterPages extends LightningElement {
   
    name;
    username;
    password;
    phone;
    Security;
    email;
    companyname;
    securityone;
    securitytwo;
    @wire(getObjectInfo, { objectApiName: Registration })
   registerInfo;
   @wire(getPicklistValues,
      {
          recordTypeId: '$registerInfo.data.defaultRecordTypeId',
          fieldApiName: securoty
      }
  )
  SecurityValues;
    nameme(event)
    {
        this.name=event.target.value;
    }
    user(event)
    {
       this.username=event.target.value;
    }
    passwords(event)
    {
       this.password=event.target.value;
    }
    phones(event)
    {
       this.phone=event.target.value;
    }
    emails(event)
    {
       this.email=event.target.value;
    }
    company(event)
    {
       this.companyname=event.target.value;
    }
    Security(event){
      this.Security=event.target.value;
    }
    Securityone(event)
    {
       this.securityone=event.target.value;
    }
    Securitytwo(event)
    {
       this.securitytwo=event.target.value;
    }
    clickme(event)
     {
        const fields={'Name':this.name, 'username__c':this.username, 'password__c':this.password, 'phoneno__c':this.phone, 'Email__c':this.email, 'compant_name__c':this.companyname, 'Security_quations__c':this.Security, 'native_place__c':this.securityone,'Your_First_Company__c':this.securitytwo};
        const recordData={apiName:'Registration__c',fields};
        createRecord(recordData).then(respons=>
            {
             alert('Registation success ' + respons.id);
        }).catch(error=>{
            alert('Registation creation faild'+error.body.message);
        });
     }
     objectApiName = Registration;
      
     fields = [Name_Field, UserName_Field, password_Field, phone_Field, email_Field, company_Field,securoty,securoty_Field,securotys_Field];
     handleSuccess(event) {
         const toastEvent = new ShowToastEvent({
             title: "Registration created",
             message: "Record ID: " + event.detail.id,
             variant: "success"
         });
         this.dispatchEvent(toastEvent);
     }
}