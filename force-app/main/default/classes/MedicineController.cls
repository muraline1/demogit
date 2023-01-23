public with sharing class MedicineController {
    @AuraEnabled(cacheable=true)

    public static List<Medicine__c> getmedicines(){

    List<Medicine__c> sourceRec = [select Id, Name,Categor__c,Rate_per_piece__c,frequency_of_sell__c,stock_available__c from Medicine__c LIMIT 10];

    return sourceRec;

    }
}