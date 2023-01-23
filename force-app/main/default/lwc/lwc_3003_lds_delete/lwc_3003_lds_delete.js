import { LightningElement,api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
export default class Lwc_3003_lds_delete extends LightningElement 
{
    @api recordId;
    deleteme(event)
    {
        deleteRecord(this.recordId).then(response=>{
            alert('record delete success');
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'Contact',
                    actionName: 'home',
                },
            });
        }).catch(error=>{});
    }
}