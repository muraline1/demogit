public with sharing class stackfileupload {
    @AuraEnabled
    public static String loadData( Id contentDocumentId ) {

        String strMessage;
        List < Stocks__c > contactList = new List < Stocks__c >();

        if ( contentDocumentId != null ) {
            
            ContentVersion contentVersionObj = [ SELECT Id, VersionData FROM ContentVersion WHERE ContentDocumentId =:contentDocumentId ];
            List < String > records = contentVersionObj.VersionData.toString().split( '\n' );
            //Removing the Header
            records.remove( 0 );

            for ( String record : records ) {

                if ( record != null ) {

                    Stocks__c objContact = new Stocks__c();
                    List < String > row = record.split( ',' );
                    objContact.Name = row[ 0 ];
                    objContact.Stock_Id__c = row[ 1 ]; 
                    objContact.Rate__c =integer.valueOf(row[ 2 ]);
                    objContact.Current_Price__c=integer.valueOf(row[ 3 ]);
                    //date parseDate=date.parse(row[ 4 ]);
                    contactList.add( objContact );
   }

            }

            try {    

                if ( contactList.size() > 0 ) {

                    Database.DeleteResult deleteResult = Database.delete( contentDocumentId, true );
                    insert contactList;
                    strMessage = 'Records loaded successfully';

                }

            }
            catch ( Exception e ) {

                strMessage = 'Some error occured. Please reach out to your System Admin';
                system.debug( e.getMessage() );

            } 
        }

        return strMessage;

    }
    @AuraEnabled(cacheable=true)
  public static List<Stocks__c > getAccounts() {
    List<Stocks__c> report= [SELECT Name, Profit__c FROM Stocks__c ORDER BY Profit__c DESC  LIMIT 5];
    return report;
  }
  @AuraEnabled(Cacheable = true)
    public static List<Stocks__c> sortAccountList(){
        List<Stocks__c> accListObj= [SELECT Id, Name, Profit__c FROM Stocks__c Where Profit__c != null limit 5 ];
        return accListObj;
    }
    @AuraEnabled(Cacheable = true)
    public static List<Stocks__c> sortAccountLists(){
        List<Stocks__c> accListObj= [SELECT Id, Name, loss__c,Profit__c FROM Stocks__c ORDER BY loss__c DESC  LIMIT 5 ];
        return accListObj;
    }

}