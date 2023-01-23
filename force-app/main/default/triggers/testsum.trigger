trigger testsum on Opportunity (before update) {
    AggregateResult[] groupedResults = [
        Select SUM (Amount) sum from Opportunity];
    for (Opportunity obj : Trigger.new)
    {
        double sum =
            double.valueOf(groupedResults[0].get('sum'));
        obj.Won_Nov_Outings__c =
            decimal.valueOf(sum);
    }
}