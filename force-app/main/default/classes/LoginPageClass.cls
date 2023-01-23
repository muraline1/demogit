public class LoginPageClass {
    @auraEnabled
    public static String getFlight(String username,String userpassw ){
        List<FlightBook__c> lcont=new List<FlightBook__c>([select user__c,Password__c from FlightBook__c where user__c=:username  Limit 1]);
        if(lcont.size()==0){
             return 'User dose not exit!';
        }
        return 'User dose not exit!';
}
}