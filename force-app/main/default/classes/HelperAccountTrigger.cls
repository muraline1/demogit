public with sharing class HelperAccountTrigger {
public static List<Account> sendEmail(List<Account>Accounts)
    {
        EmailTemplate et=[Select id from EmailTemplate where name=:'Account mail'];
        List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();   
        for(Account con : Accounts)
        {
            if(con.Email__c != null){

                Messaging.SingleEmailMessage singleMail = new Messaging.SingleEmailMessage();
                singleMail.setTargetObjectId(con.Id);
                singleMail.setTemplateId(et.Id);
                singleMail.setSaveAsActivity(false);
                emails.add(singleMail);
            }
        }
            
        Messaging.sendEmail(emails);

        return Accounts;          
        
    }
 /*public static List<Account> sendEmailafter(List<Account>Accounts)
    {
    //query on template object
        EmailTemplate et=[Select id from EmailTemplate where name=:'contact mail'];

        //list of emails
        List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();   
        
        for(Account con : Accounts)
        {
          //check for Account
            if(con.ID != null && con.Email__c != null){

                //initiallize messaging method
                Messaging.SingleEmailMessage singleMail = new Messaging.SingleEmailMessage();

                //set object Id
                singleMail.setTargetObjectId(con.Id);

                //set template Id
                singleMail.setTemplateId(et.Id);

                //flag to false to stop inserting activity history
                singleMail.setSaveAsActivity(false);

                //add mail
                emails.add(singleMail);
            }
         }
            //send mail
        Messaging.sendEmail(emails);

        return Accounts;          
        }*/
}