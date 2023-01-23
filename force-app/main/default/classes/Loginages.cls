public with sharing class Loginages {
    public Loginages() {

    }
    @AuraEnabled(cacheable = true)
    public static String getuser(String username,String password){
        List<Registration__c> lcont=new List<Registration__c>([select username__c,password__c from Registration__c where username__c=:username  Limit 1]);
        if(lcont.size()==0){
            return 'User dose not exit!';
        }
        else{
            if(lcont[0].password__c==password){
                return 'Login successfully';
            }
            else{
                return 'Invalid Password';
            }  
        }
    }
    @AuraEnabled(cacheable = true)
    public static String userget(String username){
    list<Registration__c> register=[select username__c,native_place__c from Registration__c where username__c=:username limit 1];
        System.debug(register);
        if(register.size()==0){
        return 'user not there';
        }
        else{
            for(Registration__c rc:register){
        if(rc.username__c==username){
            return 'User Find';
        }
        }
        return 'User Find';
        }
    }
    @AuraEnabled(cacheable = true)
    public static string getsecurity(String username,string native,String company){
        list<Registration__c> register=[select username__c,native_place__c,Your_First_Company__c from Registration__c where username__c=:username limit 1];
        System.debug(register);
        if(register.size()==0){
            return 'User dose not exit!';
        }
         else{
             if(register[0].native_place__c==native){
              return 'enter password ';
             }
             else if(register[0].Your_First_Company__c==company){
             return 'enter password ';
             }
             else{
                return 'invalid ans';
             }
               
            } 
        }
    
    @AuraEnabled(cacheable=true)
    public static Registration__c getSinglepassword() {
        return [
            SELECT Id,username__c,native_place__c 
            FROM Registration__c
            WITH SECURITY_ENFORCED
            LIMIT 1
        ];
    }
    @AuraEnabled
    public static void udatepassword(String username,String password) {
        Registration__c register=[select username__c,password__c from Registration__c where username__c=:username limit 1];
        register.password__c=password;
        update register;
    }
}