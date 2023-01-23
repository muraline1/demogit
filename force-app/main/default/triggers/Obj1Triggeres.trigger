trigger Obj1Triggeres on Obj1__c (before insert, before update) {
/*// Obj1 (Child) and Obj2 (Parent) in this lookup relationship
    set<Obj2__c>obj2Set = new set<Obj2__c>();
    list<Obj2__c>obj2List = new list<Obj2__c>();
    
    //Loop to traverse the record updated/Inserted
    for(Obj1__c obj1:trigger.new)
    {
           //Condition to check parent field is not null and also quantity field is not blank
           if(Obj1__c.Obj2__c != null && obj1.Quantity__c != null)
           {
                 //New instance for parent object and set related values.
                 Obj2__c obj2 = new Obj2__c();
                 obj2.Id = obj1.Obj2__c;
                 obj2.Amount__c = obj1.Quantity__c;
                 obj2Set.add(obj2);
           }
           
    }
    //Add the parent records to be updated in a list
    obj2List.addAll(obj2Set);

    //Update the list if it is not blank.
    if(obj2List.size() >0)
    update obj2List;*/
}