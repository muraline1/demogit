public with sharing class cl_2903_ldsgerrecord {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccount()
     {
        List<Account> acc =[Select Id,Name,Phone,Industry from Account];
        Return acc;
    }
}