@RestResource(urlMapping='/books/*')
global with sharing  class RestResource {
    @HttpGet()
    Global Static List<book__c> Getbook()
    {
        Map<String,String> inputparms=RestContext.request.params;
        List<book__c> bookcount=[select Id,name,Author__c,Genre__c,Price__c,Offer__c,Discount__c from book__c ];
        return bookcount;
    }
    @HttpPost
    global static String createbook(String bookname,String Autho,String Genre,String Price){
        //RestRequest req = RestContext.request;
        //RestResponse res = Restcontext.response;
       // string jsonString=req.requestBody.tostring();
        //RequestWrapper wResp=(RequestWrapper) JSON.deserialize(jsonString,RequestWrapper.class);
        book__c bk = new book__c();
        bk.book_name__c = bookname;
        bk.Author__c = Autho;
        bk.Genre__c=Genre;
        bk.Price__c =(Decimal.valueOf(Price));
        //bk.Offer__c=Offer;
        try{
            insert bk;
        //ResponseWrapper res1=new ResponseWrapper('200','Created Sucessfully','Success');
        return 'record create success';
        }Catch(Exception e){
            return 'error'+e.getMessage();
        }
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