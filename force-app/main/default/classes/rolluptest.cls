@isTest
public class rolluptest {
    @isTest
    public static void method(){
        
         Account a= new Account();
        a.Name='murali';
        a.Phone='+919966514195';
        a.sumof__c =0;
       insert a;
        
        list<Contact> conlist= new list<Contact>();
        
        Contact con= new Contact();
         con.LastName= 'test1';
         con.rollup__c=100;
        insert con;
         conlist.add(con);

        Contact con2= new Contact();
            con2.LastName='test3';
         con2.rollup__c=200;
        insert con2;
          conlist.add(con2);
        
        Contact con3= new Contact();
        con3.LastName='test2';
         con3.rollup__c=300;
        insert con3;
        conlist.add(con3);
        
       
    }


}