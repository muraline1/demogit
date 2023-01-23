import { LightningElement,api,track,wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import deleteAccountss from '@salesforce/apex/AccountController.deleteAccountss';
import { updateRecord } from 'lightning/uiRecordApi';
import deleteSelectedAccounts from '@salesforce/apex/AccountController.deleteSelectedAccounts';
import Name_Field from '@salesforce/schema/Account.Name';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';
import AccountNumber_Field from '@salesforce/schema/Account.AccountNumber';
import Phone_Field from '@salesforce/schema/Account.Phone';
import Id_fIELD from '@salesforce/schema/Account.Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Paginationwithsorting extends LightningElement {
    @api  columns =[
        // {
        //     type:"button",
        //     fixedWidth: 150,
        //     typeAttributes: {
        //         label: 'Edit',
        //         name: 'edit',
        //         variant: 'brand'
        //     }
        // },  
            //{label: 'Id', fieldName: 'Id'},
            { label: 'Account Name', fieldName: 'Name', type:'text',},
            { label: 'Account Number', fieldName: 'AccountNumber',type:'text', editable: true,},
            { label: 'Phone', fieldName: 'Phone', type:'Phone',editable:true,} ,
            {
                     
                "orderable":      false,
                        "data":  "null",
                        "className": "getAccountList",
                        "defaultContent": '<a type="button" class="btn btn-primary"  data-toggle="modal" data-target="#editMemberModal"  onclick="editMember(data[0])"> <span class="glyphicon glyphicon-edit"></span>Edit</a> / <a href="" class=class="btn btn-danger">Delete</a>'
                    }      
        ];
        nameField=Name_Field;
        phoneField=Phone_Field
        AccountNumberField=AccountNumber_Field
        fields = [Name_Field, AccountNumber_Field, Phone_Field,Id_fIELD,];
        @track buttonLabel = 'Delete Records';
        @track isTrue = false;
        draftValues = [];
        @track recordsCount = 0;
        @api recordId;
        @api objectApiName;
    @track loader = false;
    @track isModalClose=false;
    @api selectedContactIdList=[];
    @track error = null;
    @track pageSize = 10;
    @track pageNumber = 1;
    @track totalRecords = 0;
    @track totalPages = 0;
    @track recordEnd = 0;
    @track recordStart = 0;
    @track isPrev = true;
    @track isNext = true;
    @api accounts = [];
    @api selectedRecords = [];
    @track recordEditId;
    refreshTable;
    error;
   // selectedRows = [];
    //On load
    connectedCallback() {
        this.getAccounts();
    }
 
    //handle next
    handleNext(){
        this.pageNumber = this.pageNumber+1;
        this.getAccounts();
    }
 
    //handle prev
    handlePrev(){
        this.pageNumber = this.pageNumber-1;
        this.getAccounts();
    }
    getSelectedRecords(event) {
        // getting selected rows
        const selectedRows = event.detail.selectedRows;
        
        this.recordsCount = event.detail.selectedRows.length;

        // this set elements the duplicates if any
        let conIds = new Set();

        // getting selected record id
        for (let i = 0; i < selectedRows.length; i++) {
            conIds.add(selectedRows[i].Id);
        }

        // coverting to array
        this.selectedRecords = Array.from(conIds);


        window.console.log('selectedRecords ====> ' +this.selectedRecords);
        //this.record = event.detail.row;
        console.log('Record Id ==> '+ this.selectedRecords);
            this[NavigationMixin.Navigate]({
                type:'standard__recordPage',
                attributes:{
                    recordId: this.record.id,
                    //objectApiName:'Account',
                    actionName: 'edit'
            }
        });
    }
    onselect(){
        var el = this.template.querySelector('lightning-datatable');
        var selected = el.getSelectedRows();
        let selectedIdsArray = [];

        for (const element of selected) {
            //console.log('elementid', element.Id);
            selectedIdsArray.push(element.Id);
    }
}
    async handleSave(event) {
        // Convert datatable draft values into record objects
        const records = event.detail.draftValues.slice().map((draftValue) => {
            const fields = Object.assign({}, draftValue);
            return { fields };
        });

        // Clear all datatable draft values
        this.draftValues = [];

        try {
            // Update all records in parallel thanks to the UI API
            const recordUpdatePromises = records.map((record) =>
                updateRecord(record)
            );
            await Promise.all(recordUpdatePromises);

            // Report success with a toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account updated',
                    variant: 'success'
                })
            );

            // Display fresh data in the datatable
            await refreshApex(this.accounts);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or reloading account',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }

    deleteAccounts() {

        if (this.selectedRecords) {
            this.buttonLabel = 'Processing....';
            this.isTrue = true;
           
            deleteAccountss({lstaccIds: this.selectedRecords }).then(result=> {
                this.refreshTable = result;
                window.console.log('result ====> ' + result);
                this.template.querySelector('lightning-datatable').selectedRows = [];
                this.buttonLabel = 'Delete Records';
                this.isTrue = false;
                const toastEvent = new ShowToastEvent({
                    title:'Success!',
                    message:'Record deleted successfully',
                    variant:'success'
                  });
                  this.dispatchEvent(toastEvent);
                this.template.querySelector('lightning-datatable').accounts = [];
                //this.template.querySelector('lightning-datatable').selectedRecords = [];
                this.recordsCount = 0;
                this.pageNumber=0;
                //this.refreshTable = result;
                this.setSelectedRows=[];
                //return refreshApex(this.refreshTable);
            }).catch(error => {
                window.console.log(error);
        //         this.errorMsg =error;
        // window.console.log('unable to delete the record due to ' + JSON.stringify(this.errorMsg));
                this.buttonLabel = 'Delete Records';
                this.isTrue = false;                
                const toastEvent = new ShowToastEvent({
                    title:'eroor!',
                    message:'error while deleting',
                    variant:'error'
                  });
                  this.dispatchEvent(toastEvent);
            });
        }
    }
    
   
    //get accounts
    getAccounts(){
        this.loader = true;
        getAccountList({pageSize: this.pageSize, pageNumber : this.pageNumber})
        .then(result => {
            this.loader = false;
            this.refreshTable = result;
                const { data, error } = result;
            if(result){
                
                var resultData = JSON.parse(result);
                this.accounts = resultData.accounts;
                this.pageNumber = resultData.pageNumber;
                this.totalRecords = resultData.totalRecords;
                this.recordStart = resultData.recordStart;
                this.recordEnd = resultData.recordEnd;
                this.totalPages = Math.ceil(resultData.totalRecords / this.pageSize);
                this.isNext = (this.pageNumber == this.totalPages || this.totalPages == 0);
                this.isPrev = (this.pageNumber == 1 || this.totalRecords < this.pageSize);   
            }
        })
        .catch(error => {
            this.loader = false;
            this.error = error;
        });
    }
 
    //display no records
    get isDisplayNoRecords() {
        var isDisplay = true;
        if(this.accounts){
            if(this.accounts.length == 0){
                isDisplay = true;
            }else{
                isDisplay = false;
            }
        }
        return isDisplay;
    }
    
    editAccountRowAction(event){
        this.isModalClose=true;
        // var el = this.template.querySelector('lightning-datatable');
        // var selected = el.getSelectedRows();
        // let selectedIdsArray = [];

        // for (const element of selected) {
        //     //console.log('elementid', element.Id);
        //     selectedIdsArray.push(element.Id);
        // }
        // this.selectedRecords = event.target.value;
        // console.log(this.selectedRecords);
        
    }
    handleSubmit(event) {
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        fields.Name = 'My Custom  Name'; // modify a field
        this.template.querySelector('lightning-record-form').submit(fields);
    }

    hideModalBox() {  
        this.isModalClose = false;
    }
    handleChange(event) {
        // Display field-level errors and disable button if a name field is empty.
       if (!event.target.value) {
           event.target.reportValidity();
           this.disabled = true;
       }
       else {
           this.disabled = false;
       }
   }
   updateAccount() {
    const allValid = [...this.template.querySelectorAll('lightning-input')]
        .reduce((validSoFar, inputFields) => {
            inputFields.reportValidity();   
            return validSoFar && inputFields.checkValidity();
        }, true);
        console.log('allValid:'+allValid);
    if (allValid) {
        // Create the recordInput object
        const fields = {};
        fields[Id_fIELD.fieldApiName] = this.selectedRecords;
        fields[Name_Field.fieldApiName] = this.template.querySelector("[data-field='Name']").value;
        fields[AccountNumber_Field.fieldApiName] = this.template.querySelector("[data-field='AccountNumber']").value;
        fields[Phone_Field.fieldApiName] = this.template.querySelector("[data-field='Phone']").value;
        console.log('fields:',fields);
        const recordInput = { fields };
        console.log("recordInput",recordInput);
        updateRecord({recordInput})
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account updated',
                        variant: 'success'
                    })
                );
                // Display fresh data in the form
                return refreshApex(this.accounts);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updateing record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
        }
    else {
        // The form is not valid
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Something is wrong',
                message: 'Check your input and try again.',
                variant: 'error'
            })
         );
    }

   }
}