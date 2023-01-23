public class Medcontroller {
@AuraEnabled(cacheable=true)
    public static List<Account> fetchAcc (String searchKey){
        String query= 'SELECT Id, Name,stock_available__c FROM Medicine__c';
         if ( searchKey != Null ) {
            String key = '%' + searchKey + '%';
            query += ' WHERE Name LIKE :key LIMIT 10';
        }system.debug(Database.query( query ));
         return Database.query( query );
        
    }  
      
    @AuraEnabled
    public static Boolean checkCustomer (String searchKey){
        List<customer__c> lstMedical=[SELECT ID FROM customer__c where phone__c=:searchKey];
        if(lstMedical.size()>0)
            return false;
       return true;
    }
    
     @AuraEnabled
    public static void UpdateCustomer (String searchKey,String cart){
        customer__c cust=[SELECT ID FROM customer__c where phone__c=:searchKey LIMIT 1];
        populateMedicalCustomerRecord(cust.Id,cart);
        cart='?cart='+cart;
        GeneratePDFCode.generatePdf(cart,cust.Id);
    }
    
	@AuraEnabled
    public static void saveCustomerDetails (String name,String mobile,String cart){
        customer__c cust=new customer__c();
        cust.Name=name;
        cust.Phone__c=mobile;
        insert cust;
        
        populateMedicalCustomerRecord(cust.Id,cart);
        
        cart='?cart='+cart;
        GeneratePDFCode.generatePdf(cart,cust.Id);
    }
    
     public static List<String> fetchObjects(String str){
        List<String> splits=str.split('}');
        Integer i=0;
        for(String ss:splits){
            String temp=ss;
            ss=ss.substring(1)+'}';
            splits[i]=ss;
            i++;
        }
        return splits;
    }
    
    public static void populateMedicalCustomerRecord(Id custid,String cart){
        String str=cart;
        System.debug('Strings:'+str);
        str=str.replaceAll('Price__c', 'rate');
        str=str.replaceAll('company__c', 'company');
        List<String> cartItems=fetchObjects(str);
        
        List<Medicine__c> lstSaleDetails=new List<Medicine__c>();
        for(String str1:cartItems){
            if(str1.length()<5){
                break;
            }
            cartWrapper cwn=(cartWrapper)JSON.deserialize(str1,cartWrapper.class);
            
            Medicine__c sd=new Medicine__c();
            sd.Name=cwn.Id;
            //sd.Medicine_Customer__c=custid;
            sd.quantity__c=cwn.qty;
            sd.Rate_per_piece__c=cwn.rate;
            if(sd.Name != NULL){
                lstSaleDetails.add(sd); 
            }
             
        }
        insert lstSaleDetails;
    }
    
    public class cartWrapper{
        String Id;
        String name {get;set;}
        String company {get;set;}
        Integer rate,price,qty;
    }
}