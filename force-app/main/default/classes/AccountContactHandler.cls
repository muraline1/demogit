public class AccountContactHandler implements Queueable {
    List<Account> accounts=new List<Account>();
        public AccountContactHandler(List<Account> acclist){
            for(Account acc:acclist){
               accounts.add(acc); 
            }
        }
public void execute(QueueableContext context) {
    List<Contact> contacts=new List<Contact>();
    for(Account acc:accounts){
        Contact con =new  Contact();
        con.LastName=acc.Name +'Test';
        con.FirstName= 'test';
        con.Email=acc.Name +'@gmail.com';
        con.AccountId=acc.Id;
        contacts.add(con);
    }
    if(contacts.size() > 0){
        insert contacts; 
        
    }
    }
}