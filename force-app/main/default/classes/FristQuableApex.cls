public class FristQuableApex implements Queueable {
 public void execute(QueueableContext context) {
        delete [select id from case where createddate=LAST_YEAR];
        system.enqueueJob( new SecondQuableApex());
    }
}