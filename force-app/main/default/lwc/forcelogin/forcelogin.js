import { LightningElement,track } from 'lwc';
import getuser from '@salesforce/apex/Loginages.getuser';
export default class Forcelogin extends LightningElement 
{
    username;
    password;
    @track errorCheck;
    @track errorMessage;
    showLabel;
    connectedCallback(){

        var meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, initial-scale=1.0");
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    handleUserNameChange(event){

        this.username = event.target.value;
    }

    handlePasswordChange(event){
        
        this.password = event.target.value;
    }

    handleLogin(event){

        if(this.username && this.password){
 
         event.preventDefault();
 
         getuser({ username: this.username, password: this.password })
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
}