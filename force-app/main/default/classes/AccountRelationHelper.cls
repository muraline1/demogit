public with sharing class AccountRelationHelper {
        public static Id salesOrderRecType = Schema.SObjectType.AccountRelation__c.getRecordTypeInfosByDeveloperName().get('salesorderrelation').getRecordTypeId();
        public static Id AccHierarcRecType = Schema.SObjectType.AccountRelation__c.getRecordTypeInfosByDeveloperName().get('AccountHeirarchs').getRecordTypeId();
        public static Id crmAccountRecType = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('CRM_Account').getRecordTypeId();
        public static Id DirectAccrRecType = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('Direct_Account').getRecordTypeId();
        
        @AuraEnabled(cacheable=true)
        public static List<AccountRelation__c> getrecords(string accrelId, string searchText){
       //     List<AccountRelation__c> fromacc = [SELECT Id, Name, RecordType.Name,fromaccount__c,ToAccount__c,RelationShip_type__c FROM AccountRelation__c
    
            AccountRelation__c sourceRec = [select Id, Name, fromaccount__c, toaccount__c, RecordTypeId, 
            RelationShip_type__c from AccountRelation__c  where Id =:accrelId];
            List<AccountRelation__c> accrelRecords = new List<AccountRelation__c>();
            String searchString;
            if(searchText!=''){
                searchString = '%'+searchText+'%';
            }
            else{
                searchString = '%%';
            }
            accrelRecords = [select Id, Name, fromaccount__c, toAccount__c,toAccount__r.Name, RecordTypeId, RelationShip_type__c
                             from AccountRelation__c where (RelationShip_type__c=:sourceRec.RelationShip_type__c AND toAccount__c =:sourceRec.toAccount__c AND Id!=:sourceRec.Id) AND
                             (RecordTypeId =:AccHierarcRecType OR RecordTypeId =:salesOrderRecType) AND 
                             (fromaccount__r.RecordTypeId =:crmAccountRecType OR fromaccount__r.RecordTypeId =:DirectAccrRecType) AND (Name Like :searchString)];
            system.debug(accrelRecords);
            system.debug(AccHierarcRecType);
            system.debug(salesOrderRecType);
            return accrelRecords;
        }
        
    }