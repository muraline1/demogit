import { LightningElement,wire,track,api } from 'lwc';
import fetchMedicins from '@salesforce/apex/MedicineController.getmedicines';
import fetchsObjectData from '@salesforce/apex/Cartcontroller.fetchsObjectData';
import { NavigationMixin } from 'lightning/navigation';
import id from '@salesforce/schema/Medicine__c.Id';
import Name from '@salesforce/schema/Medicine__c.Name';
import Rate_per_piece__c from '@salesforce/schema/Medicine__c.Rate_per_piece__c';
import quantity__c from '@salesforce/schema/Medicine__c.quantity__c';


export default class Medicalcustomer extends NavigationMixin(LightningElement)
{
    @api objectName = 'Medicine__c';
@track sObjData= [];

    @track isModalClose=false;
    @api count=0;
    @api objectApiName;
    fields = [id,Name,Rate_per_piece__c,quantity__c];
    
    messageContext;
    @api recordId;
     displayrecords=false;
     @track isModalOpen = false;
    records;
    @track arr=[];
    sortedColumn;
    sortedDirection = 'asc';
    initialRecords;
   
   
    @wire(fetchsObjectData, {obName :'$objectName'} )
        wiredResult(result) { 
            if (result.data) {
                this.sObjData = result.data;
            }
        }
        handleClick(event)
        {
            const itemIndex = event.currentTarget.dataset.index;
            const rowData = this.sObjData[itemIndex];
            
            // eslint-disable-next-line no-console
            console.log(rowData);
        }
    @wire( fetchMedicins )  
    wiredAccount( { error, data } ) {
        if (data) {

            this.records = data;
            this.initialRecords = data;
            this.error = undefined;

        } else if ( error ) {

            this.error = error;
            this.initialRecords = undefined;
            this.records = undefined;

        }
    }  


    AddRecord(event){
        //this.dispatchEvent(new CustomEvent('increment'));
        this.count=this.count+1;
        console.log('...');
        console.log('aaa:' ,event.target.dataset.index);
        console.log('@@@'+event.target.dataset);
        const recid =  event.target.dataset.index;
        const recName =  event.target.dataset.name;
        const recRate=event.target.dataset.rate;
        const recquanty=event.target.dataset.quantity;
        
        var obj={
            'id':recid,
            'Name':recName,
            'Rate_per_piece__c':recRate,
            'quantity__c':recquanty
        };
        this.recordId=recid;
        this.arr.push(obj);
        console.log('ARRAY:'+this.arr);
        
      }

      handleKeyChange( event ) {  
          
        const searchKey = event.target.value.toLowerCase();  
        console.log( 'Search Key is ' + searchKey );
 
        if ( searchKey ) {  

            this.records = this.initialRecords;
 
             if ( this.records ) {

                let recs = [];
                for ( let rec of this.records ) {

                    console.log( 'Rec is ' + JSON.stringify( rec ) );
                    let valuesArray = Object.values( rec );
                    console.log( 'valuesArray is ' + valuesArray );
 
                    for ( let val of valuesArray ) {
                        
                        if ( val ) {

                            if ( val.toLowerCase().includes( searchKey ) ) {

                                recs.push( rec );
                                break;
                        
                            }

                        }

                    }
                    
                }

                console.log( 'Recs are ' + JSON.stringify( recs ) );
                this.records = recs;

             }
 
        }  else {

            this.records = this.initialRecords;

        }
 
    }
      
    viewRecords(){
        this.isModalOpen=true;
      
    }
    closeModal(event){
        //alert('called');
        this.isModalClose=true;
        //alert(this.isModalClose);
       
       
        
        

    }
    isclear(event){
        this.count = 0;
            
    
}
issell(){
    this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes: {
            objectApiName: 'customer__c',
            actionName: 'new'
        }
    });
}
}