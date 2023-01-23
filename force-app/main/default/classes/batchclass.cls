global class batchclass implements Database.Batchable<sObject>
{
    
    global Database.QueryLocator start(Database.BatchableContext BC)
    {
        Date Days = System.today().addDays(-30);
        String query = 'Select Id from Task where LastModifiedDate>:Days' ;
        return Database.getQueryLocator(query);
    }
    global void execute(Database.BatchableContext BC, List<Task> scope)
    {
        System.debug(scope);
        delete scope;
    }
    
    global void finish(Database.BatchableContext BC)
    {
        
    }
}