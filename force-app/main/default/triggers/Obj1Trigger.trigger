trigger Obj1Trigger on Obj1__c (after insert)
{
    if(trigger.IsAfter && trigger.IsInsert){
    obj1handler.insertmethod(trigger.new);
    } 
   
}