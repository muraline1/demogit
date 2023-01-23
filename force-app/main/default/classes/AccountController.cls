public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static String getAccountList(Integer pageSize, Integer pageNumber){
        String jsonDT = '';
         
        //Offset for SOQL
        Integer offset = (pageNumber - 1) * pageSize;
         
        //Total Records
        Integer totalRecords = [SELECT COUNT() FROM Account];
        Integer recordEnd = pageSize * pageNumber;
         
        AccountDTWrapper objDT =  new AccountDTWrapper();  
        objDT.pageSize = pageSize;
        objDT.pageNumber = pageNumber;
        objDT.recordStart = offset + 1;
        objDT.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        objDT.totalRecords = totalRecords;
        objDT.accounts = [SELECT Id, Name, AccountNumber, Phone FROM Account LIMIT :pageSize OFFSET :offset];
        jsonDT = JSON.serialize(objDT);
        return jsonDT;
    }
    
    public class AccountDTWrapper {
        public Integer pageSize {get;set;}
        public Integer pageNumber {get;set;}
        public Integer totalRecords {get;set;}
        public Integer recordStart {get;set;}
        public Integer recordEnd {get;set;}
        public List<Account> accounts {get;set;}
    }
    @AuraEnabled
    public static void deleteAccountss(list<Id> lstaccIds){
       // try {
            list<Account> lstToDelete = new list<Account>();
            System.debug('lstaccIds ====> '+lstaccIds);
            for(Id idCon : lstaccIds) {
                lstToDelete.add(new Account(Id = idCon));
            }
            if(!lstToDelete.isEmpty()) {
                delete lstToDelete;
            }
            
        //}
        //catch(Exception ex) {
        //    throw new AuraHandledException(ex.getMessage());
        //}
    }
    @AuraEnabled
    public static void deleteSelectedAccounts(List<Account> AccountLst) {
        delete AccountLst;
    }

}