public with sharing class cl_3003_wireSearch 
{
    @AuraEnabled(cacheable=true)

    public static List<Contact> searchcontact(String searchkey)
    {
        String sk='%'+  searchkey +'%' ;
        list<Contact> conss= [Select Id,Name,Phone,Email from Contact where FirstName like:sk];
        Return conss;
    }
}