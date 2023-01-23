public class updateOppWhenUpdateAccount {
 public static void ifAccountGetUpdated(List<Account> accounts)
    {
    
        Map<id,Account> acmap = new map<id,Account>(accounts);
        
        //Opportunities related to an account has been added to this set
        //We are creating the Map because we need to query on opportunity in final logic so needed the only Id and related opp.
        Map<Id, Opportunity> oppMap = new Map<Id, Opportunity>([SELECT ID, AccountId, StageName, createdDate FROM
                                                                Opportunity where AccountId IN :acmap.keySet()]);
        //FINAL LIST OF UPDATED OPPORTUNITIES
        List<Opportunity> finalList = new  List<Opportunity>();
        
        
        for(Opportunity ops : oppMap.values())
        {
            if(ops.CreatedDate < System.today()-30 && ops.StageName!= 'Closed Won')
            {
                ops.StageName = 'Closed Lost';
                ops.CloseDate = System.today();
                finalList.add(ops);
            }
        }
        update finalList;
        
    }
    
    
}