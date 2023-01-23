({
	doInit : function(component, event, helper) {
        helper.initHelper(component, event, helper);
	},
        
          
    metaActionRow: function ( component, event, helper ) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        //alert('row ' + JSON.stringify(row));
        switch (action.name) {
            case 'edit_record':
                component.set( "v.record", row );
                var metaEle = component.find( "metaRowPopupId" );
        		$A.util.removeClass( metaEle, "slds-hide" );
                break;
        }
    },
    handleCancelPopupClick: function( component, event, helper ){        
        var metaEle = component.find( "metaRowPopupId" );
        $A.util.addClass( metaEle, "slds-hide" );
    },
    handleSavePopupClick:function( component, event, helper ) {
    	var record = component.get( "v.record" );
        if( record.MasterLabel != null && record.MasterLabel != '' )
            helper.saveRecordAsync( component );
        else
            alert( "Please provide no." );
    },
    
    
})