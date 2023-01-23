public with sharing class MedicalController {
    @AuraEnabled( cacheable = true )  
    public static List< Medicine__c > fetchMedicins( String searchKey,String objectName, String searchField ) {  
      
        String strKey = '%' + searchKey + '%';  
        return [ SELECT Id, Name, stock_available__c FROM Medicine__c WHERE Name LIKE: strKey LIMIT 10 ]; 
        
          
    }  
}