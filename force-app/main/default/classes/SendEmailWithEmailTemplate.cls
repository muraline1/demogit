public class SendEmailWithEmailTemplate{
  
    public  SendEmailWithEmailTemplate() {            
    }    
    
    @RemoteAction
    public static string SendEmail(String toEmailAddress){
        String isSuccess='';
        try{
            //Query logged in User information
            User usr =[Select firstname, lastname from User WHERE Id =:Userinfo.getUserId()];  
            //Query email template
            EmailTemplate template=[SELECT Id,Body,HtmlValue,Subject FROM EmailTemplate WHERE Id = '00X0K000001dqzN'];
            //get template body
            String plainText = template.HtmlValue;
            //Replace merged field with user information
            plainText = plainText.replace('{!User.FirstName}', Usr.FirstName);
            plainText = plainText.replace('{!User.LastName}', Usr.LastName);
            
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setToAddresses(new List<String>{toEmailAddress});   
            mail.setHtmlBody(plainText);
            mail.setSubject(template.Subject); 
            Messaging.SendEmailResult [] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});       
            isSuccess='SUCCESS';
        }
        catch(Exception ex){
            isSuccess=ex.getMessage()+'\n'+ex.getLineNumber()+'\n'+ex.getCause()+'\n'+ex.getStackTraceString();
        }
        return isSuccess;
    }
 }