trigger Rollupsummary on Contact (After insert,After Update,After Delete) {
    set<Id> setAccountId = new set<Id>();
    if(Trigger.isInsert ||Trigger.isUpdate){
        for(Contact con:Trigger.new){
            setAccountId.add(con.AccountId);
        }
    }
    if(Trigger.isDelete){
        for(Contact con:Trigger.old){
            setAccountId.add(con.AccountId);
        }
    }
    if(setAccountId.size()>0){
        RolluoSummary.summary(setAccountId);
    }  
}