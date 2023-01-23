public with sharing class cl_3003_wireGETupdate {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getupcon()
    {
        List<Contact> con= [Select Id, FirstName, LastName, Email, Phone from Contact ];
        Return con;

    }
}