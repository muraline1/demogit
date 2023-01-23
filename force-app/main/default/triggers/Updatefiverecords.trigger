trigger Updatefiverecords on Contact (after insert, after update, after undelete) {
    Set<Id> accountIds = new Set<Id>();
    for(Contact record: Trigger.new) {
        accountIds.add(record.AccountId);
    }
    accountIds.remove(null);
    Set<Id> morethan5Contacts = new Map<Id, AggregateResult>([
        SELECT AccountId Id
        FROM Contact
        WHERE AccountId = :accountIds
        GROUP BY AccountId
        HAVING COUNT(Id) > 5]).keySet();
        for(Contact record: Trigger.new) {
           if(moreThan5Contacts.contains(record.AccountId)) {
                 record.AccountId.addError('You may not have more than 5 contacts per account.');
        }
    }
}