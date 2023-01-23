import { LightningElement,track,wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Opportunity_OBJECT from '@salesforce/schema/Opportunity';
import Security_FIELD from '@salesforce/schema/Opportunity.Security__c';
export default class ForgotPages extends LightningElement {
    @track value;
    @track TypeItemsFieldInfoOptions;

    @wire(getObjectInfo, { objectApiName: Opportunity_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', 
        fieldApiName: Security_FIELD})
    TypeItemsFieldInfo({ data, error }) {
        
            if (data) {
                this.TypeItemsFieldData = data;
                this.TypeItemsFieldInfoOptions = this.TypeItemsFieldData.values.filter(
                    (opt,idx) => opt.validFor.includes(idx)
                  );
            }
        
    }

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Security_FIELD})
    TypePicklistValues;
    handleChange(event) {  
        const label = event.target.label;  
        const TypePicklistValues = this.template.querySelector('p').key;
        if ( label === 'Show' ) {  
        
            this.clickedButtonLabel = 'Hide';  
            this.boolVisible = true;  
        
        } else if  ( label === 'Hide' ) {  
                
            this.clickedButtonLabel = 'Show';  
            this.boolVisible = false;  
        
        }  
 }
}