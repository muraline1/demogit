import { LightningElement } from 'lwc';

export default class Lwc_3003_event_program extends LightningElement 
{
    callme(event)
    {
        this.dispatchEvent(new CustomEvent('notifyme',{detail:'hi proxforce',bubbles:true,composed:true}));
    }
}