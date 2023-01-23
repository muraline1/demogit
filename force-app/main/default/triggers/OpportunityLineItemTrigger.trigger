trigger OpportunityLineItemTrigger on OpportunityLineItem (after delete) {
    List<Id> oppIds = new List<Id>();
    List<Opportunity> oppList = new List<Opportunity>();
    if(trigger.isDelete) {
        for (OpportunityLineItem oli3: trigger.old){
            oppIds.add(oli3.OpportunityId);
        }
        oppList=[Select Id, Name from Opportunity where Id IN:oppIds];
        delete oppList;
    }
}