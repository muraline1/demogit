import { LightningElement,api,wire,track} from 'lwc';
import getrecords from '@salesforce/apex/AccountRelationHelper.getrecords';
import getAccRelAccs from '@salesforce/apex/AccountRelationController.getAccRelAccs';
import { updateRecord } from "lightning/uiRecordApi";
import ID_FIELD from "@salesforce/schema/AccountRelation__c.Id";
import REALLOCATE_FIELD from "@salesforce/schema/AccountRelation__c.Re_Allocated_to_AccRel__c";        

//const DELAY = 300; // dealy apex callout timing in miliseconds  AccountRelation__c

export default class AccountRelation extends LightningElement {
     
            @track isModalOpen = false;
            @api recordId;
            @track accountRelName = '';
            @track accRelRecords =[];
            @track messageResult = false;
            @track isShowResult = false;
            @track showSearchedValues = false;
            @track selectedRecordId;
            @track selectedRecord;
            @wire(getrecords, {accrelId:'$recordId', searchText:'$accountRelName'})
            retrieveAccountRelationRecs ({error, data}) {
               this.messageResult=false;
        if (data) {
                   console.log('data::'+data.length);
                   if(data.length>0 && this.isShowResult){
                       let tempRecords = JSON.parse( JSON.stringify(data));
                    tempRecords = tempRecords.map( row => {
                        return { ...row, AccountTo: row.toAccount__r.Name};
                    })
                    this.accRelRecords = tempRecords;               
                       this.showSearchedValues = true; 
                       this.messageResult=false;
                   }            
                   else if(data.length==0){
                       this.accRelRecords = [];                
                       this.showSearchedValues = false;
                       if(this.accountRelName!='')
                           this.messageResult=true;               
                   }  
               }
            }
            handleClick(event){
                this.isShowResult = true;   
                this.messageResult=false;        
            }
            
            handleKeyChange(event){       
                this.messageResult=false; 
                this.accountRelName = event.target.value;
            }  
            handleRecordSelection(event){
                this.selectedRecordId = event.target.dataset.value;
                this.accountRelName = event.target.dataset.label;
                this.showSearchedValues = false;
                  this.isShowResult = false;   
                  console.log('id is ',this.selectedRecordId);
                  console.log('name is ',this.accountRelName);
        
            }
            openModal() {
                // to open modal set isModalOpen tarck value as true
                this.isModalOpen = true;
            }
            closeModal() {
                // to close modal set isModalOpen tarck value as false
                this.isModalOpen = false;
            }
            submitDetails() {
                // to close modal set isModalOpen tarck value as false
                //Add your code to call apex method or do some processing
                this.isModalOpen = true;
                const fields = {};
                fields[ID_FIELD.fieldApiName] = this.recordId;
                fields[REALLOCATE_FIELD.fieldApiName] = this.accountRelName;
                const recordInput = { fields: fields};
                updateRecord(recordInput).then((record) => {
                    console.log(record);
                    });
        
        
            }
        
        }