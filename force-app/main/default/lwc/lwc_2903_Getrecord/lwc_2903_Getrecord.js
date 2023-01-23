import { LightningElement, wire } from 'lwc';
import getAccount from '@salesforce/apex/cl_2903_ldsgerrecord.getAccount';
export default class Lwc_2903_Getrecord extends LightningElement 
{
    @wire(getAccount) murali;

}