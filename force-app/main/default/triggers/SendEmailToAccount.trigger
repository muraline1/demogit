trigger SendEmailToAccount on Contact (after insert,after update) 
{
    if(Trigger.isAfter)
    {
        if(Trigger.isInsert )
        { 
            HelperContactTrigger.sendEmail(trigger.new);
        }
    }
        if(trigger.isAfter && trigger.isUpdate )
        {           
         HelperContactTrigger.sendEmail(trigger.new);
        }
}