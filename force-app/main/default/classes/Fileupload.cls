public with sharing class Fileupload {
    @AuraEnabled
    public static List<Stocks__c> loadData( String contentDocumentId ) {
        string data =JSON.deserializeUntyped(contentDocumentId).toString();
        List < Stocks__c > Listlines = new List < Stocks__c >();
        List < String > records = data.split( '\n' );
        for(Integer i=1;i<records.size();i++){
            Stocks__c objContact = new Stocks__c();
            String csvline=records[i];
            String preLine=csvline;
            Integer startIndex;
            Integer endIndex;
            List < String > row = new List < String >();
            for(String column:csvline.split(',')){
                column=column.replaceAll(':quotes:','').replaceAll(':comma:','');
                row.add(column);
            }
            objContact.Name = row[ 0 ];
            objContact.Stock_Id__c = row[ 1 ]; 
            objContact.Rate__c =integer.valueOf(row[ 2 ]);
            objContact.Current_Price__c=integer.valueOf(row[ 3 ]);
            date parseDate=date.parse(row[ 4 ]);
            Listlines.add( objContact );  
        }
   
        insert Listlines;
        return [select Stock_Id__c,Rate__c,Current_Price__c From Stocks__c];
    } 
}