public with sharing class SlackNotification {
        private List<Opportunity> listOfOpp = new List<Opportunity>();
       Map<Id, Opportunity> mapOfOldStage = new Map<Id, Opportunity>();
    
 private static final String SLACK_URL = 'https://hooks.slack.com/services/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';
     
    public class Oppty {
        @InvocableVariable(label='Opportunity Name')
        public String opptyName;               
    }
     
    @InvocableMethod(label='Post to Slack')
    public static void postToSlack ( List<Oppty> opps ) {
        Oppty o = opps[0]; // bulkify the code later
         
   // Map<Id, Opportunity> mapOfOldStage = new Map<Id, Opportunity>();
        Map<String,Object> msg = new Map<String,Object>();
        msg.put('text', 'The following Deal is closed/won - ' + o.opptyName);
        msg.put('mrkdwn', true);
        
        String body = JSON.serialize(msg);   
        System.enqueueJob(new QueueableSlackPost(SLACK_URL, 'POST', body));
    }
     
    public class QueueableSlackPost implements System.Queueable, Database.AllowsCallouts {
         
        private final String url;
        private final String method;
        private final String body;
         
        public QueueableSlackPost(String url, String method, String body) {
            this.url = url;
            this.method = method;
            this.body = body;
        }
         
        public void execute(System.QueueableContext ctx) {
            List<Opportunity> opplist = new List<Opportunity>();
              List<Opportunity> listOfOpp = new List<Opportunity>();
             Map<Id, Opportunity> mapOfOldStage = new Map<Id, Opportunity>();
             set<string> setOppId = new set<string>();
             for(Opportunity objOpportunity: listOfOpp){
            if((objOpportunity.stagename == 'Closed Won')
               && objOpportunity.stagename != mapOfOldStage.get(objOpportunity.id).stagename) {
                   setOppId.add(objOpportunity.id);
                   system.debug('setOppId--'+setOppId);
               }
        }
            HttpRequest req = new HttpRequest();
            req.setEndpoint(url);
            req.setMethod(method);
            req.setBody(body);
            Http http = new Http();
            HttpResponse res = http.send(req);
        }
    }
     
}