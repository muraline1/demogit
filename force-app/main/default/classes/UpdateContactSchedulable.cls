global class UpdateContactSchedulable implements Schedulable {
    global void execute(SchedulableContext SC) {
       UpdateContactAddresses UCA =new UpdateContactAddresses();
       database.executeBatch(UCA, 6); 
    }
         
}