import { LightningElement } from 'lwc';

export default class Lwc_3103_prarent_event_program extends LightningElement 
{
    constructor()
    {
        super();
        this.template.addEventListener('notifyme',this.handleme)
    }
    handleme(event)
    {
        alert(event.detail);
        alert('hi i can listem the button on click on child')
    }
}