public with sharing class recordfetch {
    public recordfetch() {
        
    }
    @AuraEnabled(cacheable=true)
    public static List<AccountRelation__c> fetchLookupData() {
        
        List<AccountRelation__c> getRecords=[SELECT Id, Name, RecordType.Name,fromaccount__c,toaccount__c,RelationShip_type__c FROM AccountRelation__c
                                             WHERE RecordTypeId IN (SELECT Id FROM RecordType WHERE(DeveloperName='AccountHeirarchs' OR DeveloperName='serviceRelationorders')
                                                                    AND SObjectType = 'AccountRelation__c')];
        System.debug(getRecords);
        
        List<AccountRelation__c> accre = new List<AccountRelation__c>();//2nd filter records
        List<Account> allid = [select Id from Account];
        for(AccountRelation__c aa:getRecords){
            for(Account ss:allid){
                
                if(ss.Id == aa.ToAccount__c){
                    accre.add(aa);
                }
            }
        } 
        
        List<AccountRelation__c> fromacc = [SELECT Id, Name, RecordType.Name,fromaccount__c,toaccount__c,RelationShip_type__c FROM AccountRelation__c
                                            WHERE RecordTypeId IN (SELECT Id FROM RecordType WHERE(DeveloperName='AccountHeirarchs' OR DeveloperName='serviceRelationorders')
                                                                   AND SObjectType = 'AccountRelation__c')];
        List<Account> accRecords =[SELECT Id, Name, RecordType.Name FROM Account
                                   WHERE RecordTypeId IN (SELECT Id FROM RecordType
                                                          WHERE(DeveloperName='CRMAccoun' OR DeveloperName='DirectAccount')
                                                          AND SObjectType = 'Account')];
        List<AccountRelation__c> thirdold = new  List<AccountRelation__c>();
        for(AccountRelation__c bb:fromacc){
            for(Account cc:accRecords){
                
                if(cc.Id == bb.fromaccount__c){
                    thirdold.add(bb);
                }
            }
        }
        
        List<AccountRelation__c> thirdnew = new List<AccountRelation__c>();
        for(AccountRelation__c third:accre){
            for(AccountRelation__c gh:thirdold){
                
                if(third.Id == gh.Id){
                    thirdnew.add(third);
                }
            }
        }   
        
        List<AccountRelation__c> fourthnew = new List<AccountRelation__c>();//RelationShip_type__c
        List<AccountRelation__c> fff = [select id ,RelationShip_type__c from AccountRelation__c where Id IN:thirdnew];
        for(AccountRelation__c forth:fff){
            for(AccountRelation__c thi:fromacc){
                if(forth.RelationShip_type__c == thi.RelationShip_type__c){
                    fourthnew.add(forth);
                }               
            }
        }
        return fourthnew;
        
        
        
    }
    
}