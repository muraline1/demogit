import { LightningElement,track } from 'lwc';
import getsecurity from '@salesforce/apex/Loginages.getsecurity';
export default class Securityrestpage extends LightningElement
 {
     securitys;
     @track errorCheck;
     @track errorMessage;
     @track clickedButtonLabel = 'Show security quation';
     @track showaddress = false;
     showLabel;
     security(event)
     {
        this.securitys=event.target.value;
     }
     handlsecurity(event){
        const label = event.target.label;
        if ( label === 'Show security quation' ) {
        this.clickedButtonLabel = 'Hide security quation';
        this.showaddress = true;
        } else if  ( label === 'Hide security quation' ) {
        this.clickedButtonLabel = 'Show security quation';
        this.showaddress = false;
        }
        event.preventDefault();
        console.log('this.securitys'+this.securitys);

        getsecurity({ security: this.securitys})
             .then((result) => {
                 
                this.showLabel = result;
                window.alert(this.showLabel);
                console.log('showLabel'+showLabel);
             })
             .catch((error) => {
                 this.error = error;      
                 this.errorCheck = true;
                 this.errorMessage = error.body.message;
                 this.showLabel = error;
                 window.alert(this.showLabel);
                 console.log('showLabel'+showLabel);
             });
 
         
 
     }
     
 }