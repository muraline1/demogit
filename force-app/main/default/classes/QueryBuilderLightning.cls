public with sharing class QueryBuilderLightning {
    @AuraEnabled(Cacheable=true)
    public static List<String> getObjects(){
        List<string> sObjectList = new List<string>();
        for(Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values()){
            String name = objTyp.getDescribe().getName();
            if((name != 'Map_Objects__c')){
                SobjectList.add(name);
            }
        }
        return sObjectList;
    }
    @AuraEnabled(cacheable=true)
    public static List<FieldDefinition> getfields(string objectname){
        string query = 'select DeveloperName,QualifiedApiName from FieldDefinition where EntityDefinition.QualifiedApiName = :objectname ORDER BY DeveloperName ASC';
        list<FieldDefinition> lstObject = Database.query(query);
        system.debug('lstObject==> '+lstObject);
        return lstObject;
    }
}