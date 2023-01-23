public with sharing class CustomLookupController {
    public CustomLookupController() {

    }
    @AuraEnabled(cacheable = true)
    public static List<Medicine__c> findmedican(String searchKey, String objectName, String searchField){
        String key = '%' + searchKey + '%';
        String QUERY = 'Select Id, '+searchField+' From '+objectName +' Where '+searchField +' LIKE :key';
        System.debug(System.LoggingLevel.DEBUG, QUERY);
        List<Medicine__c> sObjectList = Database.query(QUERY);
        return sObjectList;
    }
}