public class TaskEmail {
    public static void TriggerEmail(List<Task> task){
        for(Task ts:task){
            List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            List<String> sendTo = new List<String>();
            sendTo.add(UserInfo.getUserEmail());
            
            mail.setToAddresses(sendTo);
            String body='Hii Task Created';
            mail.setSubject('task created');
            mail.setHtmlBody(body);
            mails.add(mail);
            
            Messaging.sendEmail(mails);
            
            
            
        }
    }
}