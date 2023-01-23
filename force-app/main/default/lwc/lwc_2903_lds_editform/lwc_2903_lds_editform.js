import { LightningElement } from 'lwc';

export default class Lwc_2903_lds_editform extends LightningElement 
{
    recordid="0035j00000MtQ3vAAF";

    cancleme(event)
    {
        const inputFeilds=this.template.querySelectorAll('lightning-input-field');
        inputFeilds.forEach(field=>{field.reset();});
            
        
    }
}