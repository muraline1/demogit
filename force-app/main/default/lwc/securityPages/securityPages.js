import { api, LightningElement,track,wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Opportunity_OBJECT from '@salesforce/schema/Opportunity';
import Security_FIELD from '@salesforce/schema/Opportunity.Security__c';
export default class SecurityPages extends LightningElement 
{
    @track clickedButtonLabel = 'Show';  
    @api boolVisible = false; 
    StageValue ='';
    Inwhichcityborn= '';
    yourfirstvehicleno='';
    yourbirthdate= '';
    yourfirstcheckpayamount= '';
    doyouhavesiblings= '';
    
 
    // getting the default record type id, if you dont' then it will get master
 
   @wire(getObjectInfo, { objectApiName: Opportunity_OBJECT })
 
    opportunityMetadata;
 
    
 
    @wire(getPicklistValues,
 
        {
 
            recordTypeId: '$opportunityMetadata.data.defaultRecordTypeId', 
 
            fieldApiName: Security_FIELD
 
        }
 
    )
 
    OpportunityPicklist;
 
    // display the selected picklist value
  
  
    handleChange(event) {
        this.StageValue = event.detail.value;
        this.picklistVal = this.StageValue;
       if(this.picklistVal === 'Inwhichcityborn'){
          this.Inwhichcityborn = this.StageValue ;
       }else{
        this.Inwhichcityborn = '';
       }
 
       if(this.picklistVal === 'yourfirstvehicleno'){
         this.yourfirstvehicleno = this.StageValue ;
       }else{
        this.yourfirstvehicleno = '';
       }
 
       if(this.picklistVal === 'yourbirthdate'){
          this.yourbirthdate = this.StageValue ;
       }else{
        this.yourbirthdate= '';
       }
 
       if(this.picklistVal === 'yourfirstcheckpayamount'){
        this.yourfirstcheckpayamount = this.StageValue ;
     }else{
        this.yourfirstcheckpayamount = '';
     }
 
     if(this.picklistVal === 'doyouhavesiblings'){
        this.doyouhavesiblings = this.StageValue ;
     }else{
        this.doyouhavesiblings = '';
     } 
    
    }
    handleInputChange(event) {  
        const label = event.target.label;  
        const OpportunityPicklist = this.template.querySelector('p').key;
        if ( label === 'Show' ) {  
        
            this.clickedButtonLabel = 'Hide';  
            this.boolVisible = true;  
        
        } else if  ( label === 'Hide' ) {  
                
            this.clickedButtonLabel = 'Show';  
            this.boolVisible = false;  
        
        }  
 }
}