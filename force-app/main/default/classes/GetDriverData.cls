public with sharing class GetDriverData {
    public GetDriverData() {

    }
    @AuraEnabled(cacheable=true)
    public static List <AccountRelation__c > fetchLookUpValues(String 
     searchKey,String 
    fieldName, String ObjectName,String keyField) {
      List < AccountRelation__c > returnList = new List < AccountRelation__c > ();
        String sQuery =  'select '+fieldName+','+keyField+ ' from '
        +ObjectName+' LIMIT 5000' ;
        List < AccountRelation__c > lstOfRecords = Database.query(sQuery);
        for (AccountRelation__c obj: lstOfRecords) {
            returnList.add(obj);
        }
        return returnList;
    }
}