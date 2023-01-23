public class slackNotifications implements Queueable, Database.AllowsCallouts{
    private List<Opportunity> listOfOpp = new List<Opportunity>();
    Map<Id, Opportunity> mapOfOldStage = new Map<Id, Opportunity>();
    
    public slackNotifications(List<Opportunity> listOfOpp, Map<Id, Opportunity> mapOfOldStage){
        this.listOfOpp = listOfOpp;
        this.mapOfOldStage = mapOfOldStage;
        system.debug('listOfOpp--'+listOfOpp);
        system.debug('mapOfOldStage--'+mapOfOldStage);
    }
    Public void execute(QueueableContext con){
        
        List<Opportunity> opplist = new List<Opportunity>();
        set<string> setOppId = new set<string>();
        for(Opportunity objOpportunity: listOfOpp){
            if((objOpportunity.stagename == 'Closed Won')
               && objOpportunity.stagename != mapOfOldStage.get(objOpportunity.id).stagename) {
                   setOppId.add(objOpportunity.id);
                   system.debug('setOppId--'+setOppId);
               }
        }
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://hooks.slack.com/services/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');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
            for(Opportunity objOpp: [SELECT id,owner.name,CloseDate,CreatedDate,
                                             Account.name,amount,AccountId,stagename
                                             FROM Opportunity WHERE ID IN: setOppId]){
                                                 DateTime d = objOpp.CloseDate;
                                                 Id orgid = UserInfo.getOrganizationId();
												 system.debug('orgid--'+orgid);
                                                 //request.chanel='proxforce';
                                                 String body = JSON.serialize(request);
                                                 system.debug('body--'+body);
                                                 request.setBody(body);
                                                 if(!Test.isRunningTest()){
                                                     HttpResponse response = http.send(request);
                                                     system.debug('response--'+response);
                                                 }
                                             }
    }
}