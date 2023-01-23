({
    doInit : function(component, event, helper) {
        component.set('v.isOpen', true);
        var flow = component.find('flow');
        flow.startFlow('Mass_Create_Program_Engagements_from_Contact_List_View');
    },
    
    closeFlowModal : function(component, event, helper) {
        component.set("v.isOpen", false);
    },
    
    closeModalOnFinish : function(component, event, helper) {
        if(event.getParam('status') === "FINISHED") {
            component.set("v.isOpen", false);
        }
    }
})