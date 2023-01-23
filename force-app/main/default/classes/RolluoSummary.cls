public class RolluoSummary {
    Public static void summary(Set<Id> accountId){
        List<Account> accountList = [Select Id,sumof__c,(Select Id ,LastName,AccountId,rollup__c FROM Contacts) From Account Where Id IN: accountId];
        for(account acc : accountList){
            acc.sumof__c = 0;
            for(Contact cu : acc.contacts){
                if(cu.rollup__c != null){
                    acc.sumof__c += cu.rollup__c;  
                }  
            }
        }
        update accountList;
    }
}