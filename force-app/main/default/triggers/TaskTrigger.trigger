trigger TaskTrigger on Task (after insert) {  
    TaskEmail.TriggerEmail(trigger.new);
}