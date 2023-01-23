public class Admincheck {
    public static void mymethod(List<Lead> leadlist){
          map<id,profile> leadmap = new map<id,profile>([select id,name from profile where id=: userinfo.getProfileId()]);
       
      
        for(Lead ld:leadlist){
       
         if(leadmap.containsKey(userinfo.getProfileId()) && leadmap.get(userinfo.getProfileId()).Name == 'System Administrator'){
                ld.checkbox__c  = false;
            }
          }
        }     
}