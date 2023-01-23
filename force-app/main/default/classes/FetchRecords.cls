global with sharing class FetchRecords {
@auraEnabled
    public static List<ToDos__c> getAllRecords()
    {
     List<ToDos__c> reg=new LIST<ToDos__c>();  
        reg=[select id,Name,Email__c,phone__c from ToDos__c];
        return reg;
    } 
    public ToDos__c getSelectedregistrations(Id id)
    {    
      ToDos__c  reg=[select id,Name,Email__c,phone__c from ToDos__c where id=:id];
        return reg;
    } 
   
}