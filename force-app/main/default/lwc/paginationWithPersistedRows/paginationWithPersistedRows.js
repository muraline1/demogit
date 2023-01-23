import { LightningElement,track } from 'lwc';
import getAccountsWithOffset from '@salesforce/apex/accountPagination.getAccountsWithOffset';
import deleteAccountlist from '@salesforce/apex/accountPagination.deleteAccountlist';

export default class PaginationWithPersistedRows extends LightningElement {
    data = [];
    pageNumber = 1;
    pageSize = 10;
    refreshTable;
    isLastPage = false;
    resultSize = 0;
    selection = [];
    hasPageChanged;
    error;
    @track buttonLabel = 'Delete Records';
    @track isTrue = false;
    @track recordsCount = 0;
  
    columns = [
      { label: "Name", fieldName: "Name", type: "text" },
      { label: "BillingStreet", fieldName: "BillingStreet", type: "text" }
    ];
  
  
  
    connectedCallback() {
      this.getAccounts();
    }
    
    rowSelection(evt) {
      // List of selected items from the data table event.
      let updatedItemsSet = new Set();
      // List of selected items we maintain.
      let selectedItemsSet = new Set(this.selection);
      // List of items currently loaded for the current view.
      let loadedItemsSet = new Set();
  
  
      this.data.map((event) => {
          loadedItemsSet.add(event.Id);
      });
  
  
      if (evt.detail.selectedRows) {
          evt.detail.selectedRows.map((event) => {
              updatedItemsSet.add(event.Id);
          });
  
  
          // Add any new items to the selection list
          updatedItemsSet.forEach((id) => {
              if (!selectedItemsSet.has(id)) {
                  selectedItemsSet.add(id);
              }
          });        
      }
  
  
      loadedItemsSet.forEach((id) => {
          if (selectedItemsSet.has(id) && !updatedItemsSet.has(id)) {
              // Remove any items that were unselected.
              selectedItemsSet.delete(id);
          }
      });
  
  
      this.selection = [...selectedItemsSet];
      console.log('---selection---'+JSON.stringify(this.selection));
      
    }
  
  
    previousEve() {
      //Setting current page number
      let pageNumber = this.pageNumber;
      this.pageNumber = pageNumber - 1;
      //Setting pageChange variable to true
      this.hasPageChanged = true;
      this.getAccounts();
    }
    deleteAccounts(){
        if (this.selection) {
            // setting values to reactive variables
            this.buttonLabel = 'Processing....';
            this.isTrue = true;

            // calling apex class to delete selected records.
            this.deleteCons();
        }
    }


    deleteCons() {
        deleteAccountlist({lstaccIds:this.selection})
        .then(result => {
            window.console.log('result ====> ' + result);

            this.buttonLabel = 'Delete Records';
            this.isTrue = false;

            // showing success message
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!', 
                    message: this.recordsCount + ' account are deleted.', 
                    variant: 'success'
                }),
            );
            
            // Clearing selected row indexs 
            this.template.querySelector('lightning-datatable').selectedItemsSet = [];

            this.recordsCount = 0;

            // refreshing table data using refresh apex
            return refreshApex(this.refreshTable);

        })
        .catch(error => {
            window.console.log('error'+JSON.stringify(this.errorMsg));
             this.errorMsg =error;
        window.console.log('unable to delete the record due to ' + JSON.stringify(this.errorMsg));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while getting Contacts', 
                    message: error.message, 
                    variant: 'error'
                }),
            );
        });
    }  
    
  
    nextEve() {
      //get current page number
      let pageNumber = this.pageNumber;
      //Setting current page number
      this.pageNumber = pageNumber + 1;
      //Setting pageChange variable to true
      this.hasPageChanged = true;
      this.getAccounts();
    }
  
  
    get recordCount() {
      return (
        (this.pageNumber - 1) * this.pageSize +
        " to " +
        ((this.pageNumber - 1) * this.pageSize + this.resultSize)
      );
    }
  
  
    get disPre() {
      return this.pageNumber === 1 ? true : false;
    }
  
  
    getAccounts() {
      getAccountsWithOffset({
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      })
        .then(result => {
          let accountData = JSON.parse(JSON.stringify(result));
          this.data = accountData;
          if (accountData.length < this.pageSize) {
            this.isLastPage = true;
          } else {
            this.isLastPage = false;
          }
          this.resultSize = accountData.length;
          this.refreshTable = result;
          this.template.querySelector(
              '[data-id="datarow"]'
            ).selectedRows = this.selection;
        })
        .catch(error => {
          this.error = error;
        });
    }
}