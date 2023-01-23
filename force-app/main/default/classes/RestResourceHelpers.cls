@RestResource(urlMapping='/allbooks/*')
global with sharing class RestResourceHelpers {

     @HttpPost
    global static String newrecord(String bookname,String Autho,String Genre,String Price,Boolean isInStock){
         string jsonString=RestContext.request.requestbody.ToString();
         
        book__c bk = new book__c();
       List<book__c>  bks =(List<book__c>) system.JSON.deserialize(jsonString, List<book__c>.Class);
       
        bk.Name = bookname;
        bk.Author__c = Autho;
        bk.Genre__c=Genre;
        bk.Price__c =(Decimal.valueOf(Price));
        bk.isInStock__c=isInStock;
       insert bks;
        return 'record create success';
       
    }   
    @HttpPut
    global static String updaterecord(String id,String bookname,String Autho,String Genre,String Price,String Offer){
        book__c bk = new book__c();
        book__c bks =[select id,name,Author__c,Genre__c,Price__c,Offer__c,Discount__c from book__c where id =:id];
        if(bks.id!=null){
        bks.Id=id;
        bks.Name = bookname;
        bks.Author__c = Autho;
        bks.Genre__c=Genre;
        bks.Price__c = (Decimal.valueOf(Price));
        bks.Offer__c=Offer;
        update bks;
        return 'record update success';
        }
        else
            return 'update record Failed'; 
    }   
}