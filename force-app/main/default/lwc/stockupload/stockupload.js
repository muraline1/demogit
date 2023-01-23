import { LightningElement,track,api,wire } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import loadData from '@salesforce/apex/stackfileupload.loadData';
import getrecords from '@salesforce/apex/stackfileupload.getAccounts';
import sortAccountItem from '@salesforce/apex/stackfileupload.sortAccountList';
import sortAccountItems from '@salesforce/apex/stackfileupload.sortAccountLists';


export default class Stockupload extends LightningElement
 {
    
    @track isModalOpen=false;
     @api sortAccountData;
    @track data;
    //@track columns = columns;
    @track sortBy;
    @track sortDirection;
    @wire(sortAccountItem) murali;
    @wire(sortAccountItems) kumar;
    @wire(getrecords) siva;
    accounts(result) {
        if (result.data) {
            this.data = result.data;
            this.error = undefined;


        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }
    @track columns = [
        { label: 'Name', fieldName: 'Name'},
        { label: 'Id', fieldName: 'Id'},
        { label: 'Profit', fieldName: 'Profit__c',sortable: true,},
        { label: 'loss', fieldName: 'loss__c',sortable: true,},
    ];
   @track accountList;
    error;
    isLoaded = false;

    get acceptedFormats() {
        return ['.csv'];
    }
    
    uploadFileHandler( event ) {
        
        this.isLoaded = true;
        const uploadedFiles = event.detail.files;

        loadData( { contentDocumentId : uploadedFiles[0].documentId } )
        .then( result => {

            this.isLoaded = false;
            window.console.log('result ===> '+result);
            this.strMessage = result;
            this.dispatchEvent(
                new ShowToastEvent( {
                    title: 'Success',
                    message: result,
                    variant: result.includes("success") ? 'success' : 'error',
                    mode: 'sticky'
                } ),
            );

        })
        .catch( error => {

            this.isLoaded = false;
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent( {
                    title: 'Error!!',
                    message: JSON.stringify( error ),
                    variant: 'error',
                    mode: 'sticky'
                } ),
            );     

        } )

    }
    seereports()
    {
        
        this.isModalOpen = true;
        
        
    }
    @wire (getrecords) wiredAccounts({data,error}){
        if (data) {
        console.log(data); 
        } else if (error) {
        console.log(error);
        }
   }
   handleSortAccountData(event) {       
    this.sortBy = event.detail.fieldName;       
    this.sortDirection = event.detail.sortDirection;       
    this.sortAccountData(event.detail.fieldName, event.detail.sortDirection);
}


sortAccountData(fieldname, direction) {
    
    let parseData = JSON.parse(JSON.stringify(this.data));
   
    let keyValue = (a) => {
        return a[fieldname];
    };


   let isReverse = direction === 'asc' ? 1: -1;


       parseData.sort((x, y) => {
        x = keyValue(x) ? keyValue(x) : ''; 
        y = keyValue(y) ? keyValue(y) : '';
       
        return isReverse * ((x > y) - (y > x));
    });
    
    this.data = parseData;


}


 }