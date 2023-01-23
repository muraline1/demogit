({
   myAction : function(component, event, helper) {
        var action = component.get("c.getAllRecords");
        action.setCallback(this, function(response){
            var name = response.getState();
            if (name === "SUCCESS") {
                component.set("v.reg", response.getReturnValue());
            }
        });
     $A.enqueueAction(action);
    }
})