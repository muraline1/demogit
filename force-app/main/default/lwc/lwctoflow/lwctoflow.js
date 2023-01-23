import { LightningElement,api } from 'lwc';

export default class Lwctoflow extends LightningElement {
    @api strRecordId;
    arrayFields = ['Name', 'AccountNumber', 'Phone', 'Type', 'Website'];
    
}