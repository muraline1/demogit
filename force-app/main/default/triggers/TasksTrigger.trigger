trigger TasksTrigger on Task (after insert) {
    String Subject='New Comment for Task:';
    String Message='Message';
    String email='murali.siva1323@gmail.com';//UserInfo.getUserEmail();
    Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    String[] toAddresses = new String[] {email};
    mail.setReplyTo('comment@pm1hb7hxl2lgcw25w5wtroo4o3pci39ks57kmx17pxz04mpcw.5j-ahexreap.ap27.apex.salesforce.com');
    mail.setToAddresses(toAddresses);
    mail.setSubject(Subject);
    mail.setHtmlBody(Message);
    Messaging.SendEmailResult [] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
}