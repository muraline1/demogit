import { LightningElement,wire,api} from 'lwc';
import fetchPriceBooks from '@salesforce/apex/AddProductController1.fetchPriceBooks';
const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    
];
export default class AddProductController1 extends LightningElement {
    
    RecId;
    products;
    error;
    isModalClose=false;

edit(event){
    isModalClose=true;
    const oppId = event.detail.value;
    fetchPriceBooks({RecId:oppId})
    .then(result => {
        this.products = result;
    })
    .catch(error => {
        this.error = error;
    });
}

}