public with sharing class HelperContactTrigger {
    public static List<Contact> sendEmail(List<Contact>Contacts)
    {
        EmailTemplate et=[Select id from EmailTemplate where name=:'contact mail'];
        List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();   
        for(Contact con : Contacts)
        {
            if(con.Email != null){

                Messaging.SingleEmailMessage singleMail = new Messaging.SingleEmailMessage();
                singleMail.setTargetObjectId(con.Id);
                singleMail.setTemplateId(et.Id);
                singleMail.setSaveAsActivity(false);
                emails.add(singleMail);
            }
        }
            
        Messaging.sendEmail(emails);

        return Contacts;          
        
    }
 public static List<Contact> sendEmailafter(List<Contact>Contacts)
    {
    //query on template object
        EmailTemplate et=[Select id from EmailTemplate where name=:'contact mail'];

        //list of emails
        List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();   
        
        for(Contact con : Contacts)
        {
          //check for Account
            if(con.AccountId != null && con.Email != null){

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

        return Contacts;          
        }
}