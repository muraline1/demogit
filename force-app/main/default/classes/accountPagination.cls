public with sharing class accountPagination {
    @AuraEnabled
    public static List<Account> getAccountsWithOffset(String pageSize, String pageNumber){
        Integer ps = Integer.valueOf(pageSize);
        Integer pn = Integer.valueOf(pageNumber)-1;
        
        List<Account> accounts = [SELECT
               Id, Name,BillingStreet
               FROM Account WITH SECURITY_ENFORCED LIMIT :Integer.valueOf(ps) OFFSET :(ps*pn)];
        return accounts;
    }
    @AuraEnabled
    public static void deleteAccountlist(list<Id> lstaccIds){
        try {
            list<Account> lstToDelete = new list<Account>();
            System.debug('lstaccIds ====> '+lstaccIds);
            for(Id idCon : lstaccIds) {
                lstToDelete.add(new Account(Id = idCon));
            }
            if(!lstToDelete.isEmpty()) {
                delete lstToDelete;
            }
        }
        catch(Exception ex) {
           throw new AuraHandledException(ex.getMessage());
    }
    
}
}