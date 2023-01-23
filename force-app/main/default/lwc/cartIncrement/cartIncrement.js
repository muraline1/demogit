import { LightningElement,api } from 'lwc';

export default class CartIncrement extends LightningElement
 {
     @api count=0;
     increment(){
         this.count=this.count+1;
     }
 }