@RestResource(urlMapping='/booksss/*')
 global with sharing class updatebookclass {
 @HttpPut
    global static String updaterecord(String name,String Autho){
        system.debug('name'+name+'Autho'+Autho);
        book__c bk = new book__c();
        book__c bks =[select id,name from book__c where name =:name];
        if(bks.id!=null){
       // bks.Name = bookname;
        bks.Author__c=Autho;
        update bks;
        return 'record update success';
        }
        else
            return 'update record Failed'; 
    }  
   }