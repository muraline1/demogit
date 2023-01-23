import { LightningElement } from 'lwc';

export default class Lwc_3003_event_vlc extends LightningElement
 {
    calinc(event)
    {
        const invect=new CustomEvent('eventinc',{detail:'volume'});
        this.dispatchEvent(invect)
    }
    caldec(event)
    {
        const decvect=new CustomEvent('eventdec',{detail:'volume'});
        this.dispatchEvent(decvect);
    }
 }