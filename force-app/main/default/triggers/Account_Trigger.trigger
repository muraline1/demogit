Trigger Account_Trigger on Account(After Update){
    if(Trigger.isAfter){
        if(Trigger.isUpdate ){
            
            
            List<Opportunity> OpportunityList = new List<Opportunity>();
            Set<Id> accId=new Set<Id>();
            for(Account acc:Trigger.new){
                accId.add(acc.Id);
            }
            Map<Id, Opportunity> opptyMap = new Map<Id, Opportunity>();
            list<Opportunity> opplist=[select id, stageName, AccountId, createdDate from Opportunity where AccountId IN:accId];
            DateTime Opportunity30Days = system.now();
            system.debug(opportunity30Days);
            for(Opportunity opp: opplist){
                if(opp.createdDate < Opportunity30Days || opp.stageName != 'Closed Won'){
                    opp.stageName = 'Closed Lost';
                    
                    OpportunityList.add(opp);
                }
            }
            
            update OpportunityList;
        }
    }
}