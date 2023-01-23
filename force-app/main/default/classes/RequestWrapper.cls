global class RequestWrapper {
    public String bookname {get;set;}
    public String Autho {get;set;}
    public String Genre {get;set;}
   public  String Price {get;set;}
    public Boolean isInStock {get;set;}
    public String Offer {get;set;}
    public String Discount {get;set;}
    public String ids {get;set;}
   public RequestWrapper(String bookname,String Autho,String Genre,String Price,String Offer,String Discount,Boolean isInStock,String ids){
        this.bookname=bookname;
        this.Autho=Autho;
        this.Genre=Genre;
        this.Price=Price;
        this.isInStock=isInStock;
        this.Offer=Offer;
        this.Discount=Discount;
       this.ids=ids;
            }
}