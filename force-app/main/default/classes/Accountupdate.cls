global class  Accountupdate implements Database.Batchable<sObject>{
    Global database.QueryLocator start(Database.BatchableContext bc){
        string query = 'SELECT id,Rating, Description from Account';
         return Database.getQueryLocator(query);
    }
    global void execute(Database.BatchableContext BC, List<Account> scope) {
        
        for(Account a : scope)
        {
            if(a.Rating=='Hot'){
                a.Description='01';
            }
        }
        update scope;
    }
    global void finish(Database.BatchableContext BC) {
        AsyncApexJob a = [Select Id, Status,ExtendedStatus,NumberOfErrors, JobItemsProcessed,
                          TotalJobItems, CreatedBy.Email
                          from AsyncApexJob where Id =:BC.getJobId()];
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {'murali.siva1323@gmail.com'};
            mail.setToAddresses(toAddresses);
        mail.setSubject('Match Merge Batch ' + a.Status);
        mail.setPlainTextBody('The batch Apex job processed ' + a.TotalJobItems +
                              ' batches with '+ a.NumberOfErrors + ' failures.');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }}