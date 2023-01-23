trigger productopportunitylineitemTrigger on Opportunity (after insert) {
Pricebook2 standardPb = [select id, name, isActive from Pricebook2 where IsStandard = true limit 1];
    
    Product2 prd1 = new Product2 ();
    prd1.Name='Accomodation';
    insert prd1;
    
    PricebookEntry pbe1 = new PricebookEntry (); 
    pbe1.Product2ID=prd1.id;
    pbe1.Pricebook2ID=standardPb.id;
    pbe1.UnitPrice=50;
    pbe1.isActive=true;
    insert pbe1;
    
    List<OpportunityLineItem> oplist=new List<OpportunityLineItem>(); 
    
    for(Opportunity opp: Trigger.New)
    {
        OpportunityLineItem oppli = new OpportunityLineItem();
        oppli.PricebookEntryId=pbe1.Id;
        oppli.OpportunityId = opp.Id;
        oppli.Quantity = 7;
        oppli.TotalPrice = 15.0;
        oplist.add(oppli);
    }
    insert oplist; //----->insert OpportunityLineItem
}