import { LightningElement,track,api,wire} from 'lwc';
//import userget from '@salesforce/apex/Loginages.userget';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Registration from  '@salesforce/schema/Registration__c';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import getsecurity from '@salesforce/apex/Loginages.getsecurity';
import getSinglepassword from '@salesforce/apex/Loginages.getSinglepassword';
import Updatepassword from '@salesforce/apex/Loginages.udatepassword';
import securoty from '@salesforce/schema/Registration__c.Security_quations__c';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import securotys_Field from '@salesforce/schema/Registration__c.native_place__c';
import user from '@salesforce/schema/Registration__c.username__c';
import password from '@salesforce/schema/Registration__c.password__c';
import ID_FIELD from '@salesforce/schema/Registration__c.Id';
export default class Passwordrest extends LightningElement 
{
    test;
    @api recordId;
    disabled = false;
    disableds = false;
    natives;
    camanys;
    passwords;
    usernames;
    @track clickedButtonLabel = 'continue';
    @track clickedButtonLabels = 'continuess';
    @track continues = false;
    @track errorCheck;
    @track errorMessage;
    showLabel;
    @wire(getObjectInfo, { objectApiName: Registration })
    registerInfo;
    @wire(getPicklistValues,
       {
           recordTypeId: '$registerInfo.data.defaultRecordTypeId',
           fieldApiName: securoty
       }
   )
   RegistrationValues;
   TypePicklistValues;
   
   @wire(getSinglepassword)Registration;
    Registration;
    //@wire(udatepassword)
    username(event)
    {
       this.usernames=event.target.value;
    }
    native(event)
    {
       this.natives=event.target.value;
    }
    password(event)
    {
       this.test=event.target.value;
    }
    handleChange(event) {
      this.value = event.detail.value;
  }
   
     handlsecurity(event){
        this.disabled = true;
        const label = event.target.label;
        this.continues = true;
        if(this.usernames && this.natives){
 
            event.preventDefault();
    
            getsecurity({ username: this.usernames, native: this.natives})
                .then((result) => {
                    
                   this.showLabel = result;
                   window.alert(this.showLabel);
                   console.log('showLabel'+showLabel);
                })
                .catch((error) => {
                    this.error = error;      
                    this.errorCheck = true;
                   
                });
    
            }
    
     }
     saveme(event){
        Updatepassword({ username:this.usernames, password:this.test})
        .then((response) => {
           
            alert('password update successfully');
            console.log('this.usernames'+this.usernames);
            console.log('this.test'+this.test)
        }).catch(error=>{

            alert('record update fail');
            console.log('this.usernames'+this.usernames);
            console.log('this.test'+this.test)

        })
     }
     handlsecuritys(event)
     {
      this.disableds = true;
      const label = event.target.label;
      this.continues = true;
      if(this.usernames && this.natives){

          event.preventDefault();
  
          getsecurity({ username: this.usernames, native: this.natives,company:this.natives})
              .then((result) => {
                  
                 this.showLabel = result;
                 window.alert(this.showLabel);
                 console.log('showLabel'+showLabel);
              })
              .catch((error) => {
                  this.error = error;      
                  this.errorCheck = true;
                 
              });
            }
     }
}