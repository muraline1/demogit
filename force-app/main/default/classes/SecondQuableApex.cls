public class SecondQuableApex implements Queueable {
 public void execute(QueueableContext context) {
        delete [select id from Contact where createddate=LAST_YEAR];
       
    }
}