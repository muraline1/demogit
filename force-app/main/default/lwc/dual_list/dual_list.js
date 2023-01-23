import { LightningElement } from 'lwc';

export default class Dual_list extends LightningElement {
    _selected = [];

    get options() {
        return [
            { label: 'All', value: 'All' },
            { label: 'One', value: 'One' },
            { label: 'Two', value: 'Two' },
            { label: 'Three', value: 'Three' },
            { label: 'Four', value: 'Four' },
            { label: 'Five', value: 'Five' },
        ];
    }

    get selected() {
        return this._selected.length ? this._selected : 'none';
    }

    handleChange(e) {
        this._selected = e.detail.value;
    }
}