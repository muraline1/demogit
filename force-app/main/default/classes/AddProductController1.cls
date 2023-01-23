public with sharing class AddProductController1 {
    @AuraEnabled(cacheable = true)
    public static List<Pricebook2> fetchPriceBooks(Id oppId){
        
        List<Pricebook2> listOfPriceBooks = new List<Pricebook2>();
        Opportunity opp=[SELECT ID,Pricebook2Id,Pricebook2.name from Opportunity where id=:oppId];
        if(opp.Pricebook2Id==NULL){
            listOfPriceBooks = [SELECT ID,Name from Pricebook2];
        }
        return listOfPriceBooks;   
    }
    @AuraEnabled
    public static String savePriceBook(Id quoteId,String priceBookId){
        Opportunity opp=[SELECT ID,Pricebook2Id,Pricebook2.name from Opportunity where id=:quoteId];
        opp.Pricebook2Id=priceBookId;
        update opp;        
        return [SELECT ID,Pricebook2Id,Pricebook2.name from Opportunity where id=:quoteId].Pricebook2.name ;
    }
}