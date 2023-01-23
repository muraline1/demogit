import { LightningElement,track } from 'lwc';
import fetchMedicins from '@salesforce/apex/MedicalController.fetchMedicins';
import { NavigationMixin } from 'lightning/navigation'; 
const columns = [  
    { label: 'Id', fieldName: 'Id' },  
    { label: 'Name', fieldName: 'Name' },  
    { label: 'Rate_per_piece__c', fieldName: 'Rate_per_piece__c'},  
    { label: 'Categor__c', fieldName: 'Categor__c'},  
    { label: 'Manufacturing_company__c', fieldName: 'Manufacturing_company__c'},  
    {type: "button", typeAttributes: {  
        label: 'View',  
        name: 'View',  
        title: 'View',  
        disabled: false,  
        value: 'view',  
        iconPosition: 'left'  
    }},  
    {type: "button", typeAttributes: {  
        label: 'add',  
        name: 'add',  
        title: 'add',  
        disabled: false,  
        value: 'add',  
        iconPosition: 'left'  
    }}  
];  
  
export default class Medicalapp extends LightningElement
 {
    @track accounts;  
    @track error;  
    @track columns = columns;  
  
    handleKeyChange( event ) {  
          
        const searchKey = event.target.value;  
  
        if ( searchKey ) {  
  
            fetchMedicins( { searchKey } )    
            .then(result => {  
  
                this.accounts = result;  
  
            })  
            .catch(error => {  
  
                this.error = error;  
  
            });  
  
        } else  
        this.accounts = undefined;  
  
    }      
      
    callRowAction( event ) {  
          
        const recId =  event.detail.row.Id;  
        const actionName = event.detail.action.name;  
        if ( actionName === 'add' ) {  
  
            this[NavigationMixin.Navigate]({  
                type: 'standard__recordPage',  
                attributes: {  
                    recordId: recId,  
                    objectApiName: 'Medicine__c',  
                    actionName: 'edit'  
                }  
            })  
  
        } else if ( actionName === 'View') {  
  
            this[NavigationMixin.Navigate]({  
                type: 'standard__recordPage',  
                attributes: {  
                    recordId: recId,  
                    objectApiName: 'Medicine__c',  
                    actionName: 'view'  
                }  
            })  
  
        }          
  
    }  
  
 }