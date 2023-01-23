trigger objupdate on Obj1__c (after update) {
    
    Map < Id,Obj1__c > mapObj1 = new Map < Id, Obj1__c >();
    List < Obj2__c > listObj2 = new List< Obj2__c >();
    
    for ( Obj1__c obj : trigger.new ) {
        if ( obj.Amount__c != trigger.oldMap.get( obj.Id ).Amount__c ||obj.PhoneNumber__c != trigger.oldMap.get( obj.Id ).PhoneNumber__c || obj.Name != trigger.oldMap.get( obj.Id ).Name){
            mapObj1.put( obj.Id, obj );
        }
        
        if ( mapObj1.size() > 0 ) {
            listObj2 = [ SELECT Amount__c ,PhoneNumber__c , Name , Id FROM Obj2__c WHERE Id IN : mapObj1.keySet()];
            
            if ( listObj2.size() > 0 ) {
                
                for ( Obj2__c Obj2 : listObj2 ) {
                    
                    //Obj2.Obj1__c= mapObj1.get( Obj2.Id ).Id;
                    Obj2.Amount__c= mapObj1.get( Obj2.Id ).Amount__c;
                    Obj2.PhoneNumber__c = mapObj1.get( Obj2.Id ).PhoneNumber__c;
                    Obj2.Name = mapObj1.get( Obj2.Id ).Name;
                    
                    
                }
                update listObj2;
            }
            
        }
    }
}