trigger slacktrigger on Opportunity (after insert, after update) {
    if(trigger.isAfter && trigger.isUpdate){
        system.enqueueJob(new slackNotifications(trigger.new, trigger.oldMap));
        
    }
}