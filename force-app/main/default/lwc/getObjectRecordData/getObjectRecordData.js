import { LightningElement,wire,track,api } from 'lwc';
import fetchContactRecord from '@salesforce/apex/getRecordObjects.fetchContactRecord';
import deleteMultipleContactRecord from '@salesforce/apex/getRecordObjects.deleteMultipleContactRecord';
import { refreshApex } from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ID_FIELD from '@salesforce/schema/Contact.Id';

export default class GetObjectRecordData extends LightningElement {
    @api  columns =[
    //    {label: 'Id', fieldName: 'Id'},
        { label: 'First Name', fieldName: 'FirstName', type:'text',},
        { label: 'Last Name', fieldName: 'LastName',type:'text', editable: true,},
        { label: 'Email', fieldName: 'Email', type:'Email',editable:true,}       
    ];
    fields = [FIRSTNAME_FIELD, LASTNAME_FIELD, EMAIL_FIELD,];
    @api recordId;
    @api objectApiName;
    @track isModalClose=false;
    @wire (fetchContactRecord) wireContact;
   @api selectedContactIdList=[];
   @track errorMsg;

  
   getSelectedIdAction(event){
    const selectedContactRows = event.detail.selectedRows;
    window.console.log('selectedContactRows# ' + JSON.stringify(selectedContactRows));
    this.selectedContactRows=[];
    
    for (let i = 0; i<selectedContactRows.length; i++){
        this.selectedContactIdList.push(selectedContactRows[i].Id);
        console.log('selectedContactIdList'+selectedContactIdList);
    }

   // window.console.log('selectedContactRows1 ' + this.selectedContactRows + selectedContactRows.length );
}
deleteContactRowAction(){
    deleteMultipleContactRecord({conObj:this.selectedContactIdList})
    .then(()=>{
        this.template.querySelector('lightning-datatable').selectedContactRows=[];

        const toastEvent = new ShowToastEvent({
            title:'Success!',
            message:'Record deleted successfully',
            variant:'success'
          });
          this.dispatchEvent(toastEvent);

        return refreshApex(this.wireContact);
    })
    .catch(error =>{
        this.errorMsg =error;
        window.console.log('unable to delete the record due to ' + JSON.stringify(this.errorMsg));
    });
}
editContactRowAction(){
    this.isModalClose=true;
    
}

    async handleSave(event) {
        // Convert datatable draft values into record objects
        const records = event.detail.selectedContactIdList.slice().map((draftValue) => {
            const fields = Object.assign({}, draftValue);
            return { fields };
        });

        // Clear all datatable draft values
        this.selectedContactIdList = [];

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
                    message: 'Contacts updated',
                    variant: 'success'
                })
            );

            // Display fresh data in the datatable
            await refreshApex(this.contacts);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or reloading contacts',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }
    handleSubmit(event) {
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        fields.LastName = 'My Custom Last Name'; // modify a field
        this.template.querySelector('lightning-record-form').submit(fields);
    }
}