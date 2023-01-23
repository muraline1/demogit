public class Cl_032022_AccountSearch 
{
    @AuraEnabled
    public static List<Account> getmyacc(String searchtext)
    {
        String Q='Select Id,Name,Phone,Fax,Industry,Rating form Account where Name like \'%'+searchtext+'%\'';
        List<Account>  acc= Database.query(Q);
        Return acc;
    }

}