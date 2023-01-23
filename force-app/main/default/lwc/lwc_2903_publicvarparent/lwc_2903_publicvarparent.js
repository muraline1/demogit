import City from '@salesforce/schema/Lead.City';
import { LightningElement } from 'lwc';

export default class Lwc_2903_publicvarparent extends LightningElement 
{
    pname="murali siva kumar";
    page="28";
    pcity="hyderabad";
    bname;
    bage;
    bcity;

nameme(event)
{
    this.pname=event.target.value;
}
age(event)
{
    this.page=event.target.value;
}
City(event)
{
    this.pcity=event.target.value;
}
clickme(event)
{
 this.bname=this.pname;
 this.bage=this.page;
 this.bcity=this.pcity;
}
}