global class Taskcreation implements Messaging.InboundEmailHandler {
    global Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email,
                                                           Messaging.InboundEnvelope envelope) {
                                                               Messaging.InboundEmailResult result = new Messaging.InboundEmailresult();
                                                               	Comment__c c=new Comment__c();
                                                               c.Comment__c=email.plainTextBody;
                                                              c.ToDos__c='a085j000006xNS9AAM';//lstTd[0].Id;
                                                               insert c;
                                                               result.success = true;
                                                               return result;
                                                           }
}