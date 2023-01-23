import { api } from "lwc";
import { LightningElement } from 'lwc';

export default class Publicvar extends LightningElement 
{
    @api empname;
    @api empage;
    @api empcity;
}