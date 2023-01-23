({
	initHelper : function(component, event, helper) {       
        let rowActions = [{ 
            'label': 'Edit', 
            'iconName': 'action:edit', 
            'name': 'edit_record' 
        }]; 
        
        let columns = [                     
            { label: 'MasterLabel', fieldName: 'MasterLabel', type: 'text' }, 
            { label: 'Phone', fieldName: 'PhoneNo__c', type: 'Phone'},
            { label: 'Email', fieldName: 'Emails__c', type: 'Email'},           
            { type: 'action', typeAttributes: { rowActions: rowActions } }
        ];	
        
        component.set( "v.columns", columns );
       
        helper.retrieveDataHelper( component );
        
    },
    
    retrieveDataHelper : function( component ) {
		var action = component.get("c.customMetaObj");
        action.setCallback( this, function( response ) {
            var state = response.getState();
            if( state === "SUCCESS") {
                var result = response.getReturnValue();
                //alert('result' + JSON.stringify(result));
                //console.log( response.getReturnValue() );
                component.set( "v.data", result );
            }
            else if (state === "INCOMPLETE") {
            	alert('Error in the response');
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction( action );
    },
    saveRecordAsync: function( component ) {
        
        var action = component.get("c.saveRecord");
        action.setParam( "fieldWithValuesMap", component.get("v.record") );
        component.set( "v.record", {} );
        console.log(component.set( "v.record", {} ));
        var metaEle = component.find( "metaRowPopupId" );
        $A.util.addClass( metaEle, "slds-hide" );
        
        action.setCallback( this, function( response ) {
            var state = response.getState();
            if( state === "SUCCESS") {
                console.log( response.getReturnValue() );
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    mode: 'sticky',
                    message: 'This is a required message',
                    messageTemplate: 'Your request has been submitted. Click {0}  to track the progress.',
                    messageTemplateData: [{
                        url: '/changemgmt/monitorDeploymentsDetails.apexp?asyncId=' + response.getReturnValue(),
                        label: 'Deployment Status',
                        }
                    ]
                });
                toastEvent.fire();
            }
            else if (state === "INCOMPLETE") {
            	alert('Error in the response');
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction( action );
    },
    
    
})