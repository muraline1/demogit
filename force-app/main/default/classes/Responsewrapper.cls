global class Responsewrapper {
    public  String code {get;set;}
    public  string message {get;set;}
    public  String sucess {get;set;}
    public Responsewrapper(string code,string message,string sucess){
        this.code=code;
        this.message=message;
        this.sucess=sucess; 
       
            }
}