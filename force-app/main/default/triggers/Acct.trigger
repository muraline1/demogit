trigger Acct on Account (before insert,before update)
{
    List<Opportunity> op=new List<Opportunity>();
    for(Account ac:Trigger.New){
        if(ac.Rating=='Hot'){
            ac.Description=ac.Rating;

        Opportunity opp=new Opportunity();
        opp.Name=ac.Name;
        opp.StageName='Prospecting';
        opp.CloseDate=System.today();
        opp.Id=opp.AccountId;
            op.add(opp);
        }
    }
    insert op;
}