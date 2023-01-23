import { LightningElement,track } from 'lwc';

export default class Dual_liat_all extends LightningElement {
    @track options= [
        { label: 'All', value: 'All' },
        { label: 'Custom', value: 'Custom' },
    ];
    get checkboxoptions(){
    return  [
        { label: 'One', value: 'One' },
        { label: 'Two', value: 'Two' },
        { label: 'Three', value: 'Three' },
        { label: 'Four', value: 'Four' },
        { label: 'Five', value: 'Five' },
    ];
}
    @track rcvalue = 'All';
    @track ckvalue =['One','Two','Three','Four','Five' ];;
    @track isDisabled= true;
    handleChange(event){
       if(event.target.value == 'All'){
        this.isDisabled =true;
       }else{
        this.isDisabled =false;
       }
    }
    handleChange(e) {
        this._selected = e.detail.value;
    }
}