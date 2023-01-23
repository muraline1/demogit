trigger NumberOfChild on Contact (After Insert,After Update,After Delete) {
List<Account> accList=new List<Account>();

    Set<Id> setAccIds = new Set<Id>();
    if(Trigger.isInsert){
         if(trigger.isAfter){
        for(Contact con : Trigger.new){
            if(con.AccountId != null){
            setAccIds.add(con.AccountId);
            	}
			}
		}
    } 
    system.debug('setAccIds ==> '+setAccIds);
    if(Trigger.isUpdate){
         if(trigger.isAfter){
        for(Contact con : Trigger.new){ 
            if(con.AccountId!=Trigger.oldMap.get(con.Id).AccountId ||                                    
               con.Amount__c!=Trigger.oldMap.get(con.Id).Amount__c){
               	setAccIds.add(con.AccountId);
                setAccIds.add(Trigger.oldMap.get(con.Id).AccountId);
            	}
          
			}        
        }
    }
    if(Trigger.isDelete){
        if(trigger.isAfter){
        for(Contact con : Trigger.old) { 
            if(con.AccountId != null){
            setAccIds.add(con.AccountId);
            	}
        	}
        }
    }    
    for(Account acc :[Select id,TotalNumberofRecords__c,TotalNumber__c ,(Select id,name,Amount__c from contacts) from Account where Id in : setAccIds]){
			integer val = 0;
        for(Contact con : acc.Contacts){
            
            val += integer.valueOf(con.Amount__c);
            system.debug('====> ' +val);
        }
        system.debug(val);
        acc.TotalNumber__c = decimal.valueOf(val);
        acc.TotalNumberofRecords__c = acc.contacts.size();
        acclist.add(acc);
        
    }
    if(acclist.size()>0){
        update accList;     
    }
}