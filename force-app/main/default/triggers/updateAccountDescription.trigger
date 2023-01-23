trigger updateAccountDescription on Account (After insert,after update) 
    {
        list<Account> a = new list<Account>();
        list<Account> old = new list<Account>();
        
        for(Account c1:trigger.new){ 
            database.ExecuteBatch(new Accountupdate());
        }
        
    }