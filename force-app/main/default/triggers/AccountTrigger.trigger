trigger AccountTrigger on Account (After insert) {
    if(Trigger.isAfter && Trigger.isInsert){
        system.enqueueJob(new AccountContactHandler(Trigger.New));
    }
}