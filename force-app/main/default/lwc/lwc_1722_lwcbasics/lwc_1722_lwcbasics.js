import { LightningElement } from 'lwc';

export default class Lwc_1722_lwcbasics extends LightningElement 
{
    name ='N Murali Siva Kumar';
    age=28;
    callme(event)
    {
      
    }
    listname(event)
    {
        this.name=event.target.value;
    }
    listage(event)
    {
        this.age=event.target.value;
    }
}