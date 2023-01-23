import { LightningElement,track,api,wire } from 'lwc';
import getObjects from '@salesforce/apex/QueryBuilderLightning.getObjects';
import getfields from '@salesforce/apex/QueryBuilderLightning.getfields';
import { getFieldValue } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getRecord } from 'lightning/uiRecordApi';
export default class DisplaysobjectData extends LightningElement
 {
    @track isModalClose=false;
    @api recordId;
    @api objectApiName;
    //Design Components
    @api selected;
    @api title;
    @api icon;
    @track record;
    @track error;
    fieldsFormatted = ['Id'];
    @track _selected = [];
    @track data1 = [];
    @track objectOptions = [];
    @track selectedobject=[];
    columns = [{ label: 'Object Label', fieldName: 'label' }];
    @wire(getObjects)
    Objects(result) {
        if (result.data) {
            this.objectOptions = result.data.map(value => ({ label: value, value }));
            this.error = null;
        } else if (result.error) {
            this.error = result.error;
            this.data = null;
        }
    }
    get Options() {
        return this.data1;
    }

    handleobjects(event){
        // this.selectedobject.push(event.detail.value);
        // this.selectobject = event.detail.value;
        //this.value = event.detail.value;
        const select = event.detail.value;
        console.log('select'+select);
        getfields({
            objectname: select
          })
          .then((result) => {
            let data = JSON.parse(JSON.stringify(result));
            let lstOption = [];
          for (var i = 0;i < data.length;i++) {
              lstOption.push({value: data[i].QualifiedApiName,label: data[i].DeveloperName
              });
            }
            this.data1 = lstOption;
            console.log('data'+data1);
            console.log('lstOption'+lstOption);
            this.showLoadingSpinner = false;
          })
          .catch((error) => {
            error;
          });
         
    }
    get selected(){
        console.log('selected values'+this._selected)
        return this._selected.length ? this._selected : 'none';  

    }
   
    
    handlefields(event) {
        this._selected = event.detail.value;
        // const selectedOptionsList = event.detail.value;
        // this.selectedOptionsList=_selected
        // console.log('selected values'+selectedOptionsList);
    }
    handleClick(event){
        this.isModalClose=true;
    }
}