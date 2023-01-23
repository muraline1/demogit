import { LightningElement } from 'lwc';

export default class Lwc_3003_event_vlcplayer extends LightningElement
 {
    vol=0;
    Control;
     increasevol(event)
    {
        this.Control=event.detail;
        if(this.vol<101)
        {
        this.vol=this.vol + 1;
        }
    }
    decreasevol(event)
    {
        this.Control=event.detail;
        if(this.vol>0)
        {
            this.vol=this.vol - 1;
        }
        
    }
 }