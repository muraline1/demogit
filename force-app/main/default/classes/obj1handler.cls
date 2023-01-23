public class obj1handler {
    
    
    public static void insertmethod(list<Obj1__c> oppp){
        List<Obj1__c> objct=new List<Obj1__c>();
        List<Obj2__c> obbj2 = new  List<Obj2__c>();
        List<Obj2__c> obs = [select id, Amount__c,PhoneNumber__c from Obj2__c where Obj1__c in : Trigger.New];
        for(Obj1__c obb:oppp)
        {
            Obj2__c obb2= new Obj2__c();
            obb2.Amount__c=obb.Amount__c;
            obb2.PhoneNumber__c=obb.PhoneNumber__c;
            obb2.Name=obb.Name;
            obb2.Obj1__c=obb.Id;
            obbj2.add(obb2); 
            
        }
        
        insert obbj2;
    }
    
}