global with sharing class reallocateAccRel {
@auraEnabled
    public static List<AccountRelation__c> getAllRecords()
    {
     List<AccountRelation__c> reg=new LIST<AccountRelation__c>();  
        reg=[select id,Name,Accnum__c,fromaccount__c,toaccount__c from AccountRelation__c];
        return reg;
    } 
}