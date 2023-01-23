public class customMetadataCtrl {
    
  @AuraEnabled
    public static List<new_Meta_Data__mdt> customMetaObj(){
        List<new_Meta_Data__mdt> metaObj = [select Id,MasterLabel,PhoneNo__c,Emails__c, DeveloperName from new_Meta_Data__mdt];
        system.debug('metaObj#__11 ' + metaObj);
        return metaObj;
    }
    
        @AuraEnabled
    public static String saveRecord(String fullName, String label, Map<String, Object> fieldWithValuesMap ) {
    	
        try{
            
            Metadata.CustomMetadata customMetadata =  new Metadata.CustomMetadata();
            customMetadata.fullName = fullName;
            customMetadata.label = label;
            
           	for(String key : fieldWithValuesMap.keySet()){
            Metadata.CustomMetadataValue customField = new Metadata.CustomMetadataValue();
            customField.field = key;
            customField.value = fieldWithValuesMap.get(key); 
            customMetadata.values.add(customField);
        }
            // Add all the field values 
            Metadata.DeployContainer mdContainer = new Metadata.DeployContainer();
            mdContainer.addMetadata(customMetadata);
            
            // Setup deploy callback, MyDeployCallback implements
            // the Metadata.DeployCallback interface 
            CustomMetadataCallback callback = new CustomMetadataCallback();
        
            // Enqueue custom metadata deployment
            // jobId is the deployment ID
            Id jobId = Metadata.Operations.enqueueDeployment(mdContainer, callback);
            
            return jobId;
            
        }catch(Exception ex){
             
             System.assert(false,ex.getMessage()); 
             return 'Error while creating new button.';
         }
        
    }
}