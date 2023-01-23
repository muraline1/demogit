trigger AccountrelationDuplicate on AccountRelation__c (before update) {
Set<String> setName = new Set<String>();
	For(AccountRelation__c acc : trigger.new)
	{
		setName.add(acc.Re_Allocated_to_AccRel__c);
	}
	
	if(setName.size() > 0 )
	{
		List<AccountRelation__c> lstAccount = [select name ,id,Re_Allocated_to_AccRel__c from AccountRelation__c where Re_Allocated_to_AccRel__c in :setName ];
		
		Map<String ,AccountRelation__c> mapNameWiseAccount = new Map<String,AccountRelation__c>();
		For(AccountRelation__c acc: lstAccount)
		{
			mapNameWiseAccount.put(acc.Re_Allocated_to_AccRel__c,acc);
		}
		
		For(AccountRelation__c acc : trigger.new)
		{
			if(mapNameWiseAccount.containsKey(acc.Re_Allocated_to_AccRel__c))
			{
				acc.Re_Allocated_to_AccRel__c.addError('Name already Exist ');
			}
		}
		
	}
}