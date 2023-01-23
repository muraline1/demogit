public class PdfPageController {
    public static Integer totalBill=0;
    
    public Integer getTotal(){
        return totalBill/2;
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
    
    public List<cartWrapper> getPar(){
        String str=apexpages.currentpage().getparameters().get('cart');
        System.debug('Strings:'+str);
        str=str.replaceAll('Price__c', 'rate');
        str=str.replaceAll('company__c', 'company');
        List<String> cartItems=fetchObjects(str);
        
        List<cartWrapper> lst=new List<cartWrapper>();
        for(String str1:cartItems){
            System.debug('str1:'+str1);
            if(str1.length()<5){
                break;
            }
            cartWrapper cwn=(cartWrapper)JSON.deserialize(str1,cartWrapper.class);
            totalBill=totalBill+Integer.valueOf(cwn.price);
            if(cwn.name <> 'Total'){
                System.debug('wrappers-->'+cwn);
                lst.add(cwn);
            }
            System.debug('list : '+lst);
        }
        
        /*
		        
        List<cartWrapper> lst=new List<cartWrapper>();
        
       
        for(Integer i=1;i<4;i++){
            cartWrapper cw=new cartWrapper();
            cw.Id='1';
            cw.name='One';
            cw.company='abc xyz';
            cw.rate=100;
            cw.price=1000;
            cw.qty=10;
            lst.add(cw);
            System.debug('carts Wrappers - : '+cw);
        }
        */
        return lst;
    }
    
    public class cartWrapper{
        
        public String getname(){
            return this.name;
        }
        
        public String getcompany(){
            return this.company;
        }
        
        public Integer getprice(){
            return this.price;
        }
        
        public Integer getrate(){
            return this.rate;
        }
        
        public Integer getqty(){
            return this.qty;
        }
        
        String Id;
        String name {get;set;}
        String company {get;set;}
        Integer rate,price,qty;
    }
}