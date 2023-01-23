trigger UpdateSalesRep on Account (before insert, before update ) 
{
    set<Id> setAccowner = new set<Id>();
    for(Account Acc : trigger.New)
    { 
        setAccowner.add(Acc.ownerId);
    }
    
    Map<Id, user> usermap = new Map<Id, user>([SELECT Name FROM user WHERE Id IN: setAccowner]);
    for(Account Acc : Trigger.New)
    {
        user usr = usermap.get(Acc.ownerId);
        Acc.Usersalesrep__c = usr.Name;
    }
}