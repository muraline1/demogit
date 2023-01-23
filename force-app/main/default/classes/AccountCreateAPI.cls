@RestResource(urlMapping='/bookss/*')
global class AccountCreateAPI {
    @HttpPost
    global Static string createAccount(){
        RestRequest req = RestContext.request;
        RestResponse res = Restcontext.response;
        string jsonString=req.requestBody.tostring();
        System.debug('JsonString-->>'+jsonString);
        responseWrapper wResp=(responseWrapper) JSON.deserialize(jsonString,responseWrapper.class);
        System.debug('WResp-->>'+wResp);
        book__c acc=new book__c();
        acc.Name=wResp.wName;
        acc.Author__c=wResp.wautho;
        Insert acc;
        return 'Success';
    }
    
    public class responseWrapper{
        public string wName;
        public string wautho;
      
    }
}