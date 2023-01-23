import { LightningElement, wire } from 'lwc';
import searchcontact from '@salesforce/apex/cl_3003_wireSearch.searchcontact'
export default class Lwc_3003_wireSearch extends LightningElement
 {
    searchtext;
    myrecords;
    myerror;
    mymsg;
    serchme(event)
    {
        this.searchtext=event.target.value;
    }
    @wire(searchcontact,{searchkey:'$searchtext'}) contacts
    @wire(searchcontact,{searchkey:'$searchtext'}) RRR(error,data){
        if(data)
        {
            this.myrecords=data;
        }
        else if(error)
        {
            this.myerror=error;
        }
        else
        {
            this.mymsg='kkkk';
        }
    }
 }