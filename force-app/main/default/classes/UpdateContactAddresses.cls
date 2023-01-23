public class UpdateContactAddresses implements Database.Batchable<sObject>, Database.Stateful {
    public Integer recordsProcessed = 0;
    public Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT Id,Name,Phone,(SELECT id,Phone from Contacts) FROM Account';
        return Database.getQueryLocator(query);
    }
    
    public void execute(Database.BatchableContext bc, List<Account> scope){
        // process each batch of records
        List<Contact> contacts = new List<Contact>();
        for (Account account : scope) {
            for (Contact contact : account.contacts) {
                contact.phone= account.phone;
                contacts.add(contact);
                recordsProcessed = recordsProcessed + 1;  
            }  
        }
        update contacts;
    }
    
    public void finish(Database.BatchableContext bc){
        AsyncApexJob job = [SELECT Id, Status, NumberOfErrors, 
                            JobItemsProcessed,TotalJobItems, CreatedBy.Email
                             FROM AsyncApexJob WHERE Id = :bc.getJobId()];
        
        // call some utility to send email
        
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {'murali.siva1323@gmail.com'};
            mail.setToAddresses(toAddresses);
        mail.setSubject('Batch Status ' + job.Status + 'Record Processed ' + recordsProcessed );
        mail.setPlainTextBody('Total Jobs Processed: ' + job .TotalJobItems +   'with '+ job .NumberOfErrors + ' failures.');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });  
    }
}