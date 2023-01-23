import { LightningElement } from 'lwc';

export default class Lwc_1722_gratervalue extends LightningElement 
{
    num1;
    num2;
    num3;
    result;
    callme(event)
    {
         if(this.num1>this.num2 && this.num1>this.num3)
         {
            this.result=this.num1;
         }
         else if(this.num2>this.num1 && this.num2>this.num3)
         {
            this.result=this.num2;
         }
         else(this.num3>this.num1 && this.num3>this.num2s)
         {
            this.result=this.num3;
         }
         alert('this is grater number' + this.result);
    }
    listnum1(event)
    {
        this.num1=event.target.value;

    }
    listnum2(event)
    {
        this.num2=event.target.value;

    }
    listnum3(event)
    {
        this.num3=event.target.value;

    }
}