({

    SearchHelper : function(component, event, helper) {
        var action = component.get('c.fetchAcc');
         action.setParams({ searchKey : component.get("v.searchKeyword"),
                          });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var allValues = response.getReturnValue();
                console.log("allValues--->>> " + JSON.stringify(allValues));
                //component.set('v.activeSections', allValues.Name);
                component.set('v.accList', allValues);
            }
            else if(state === "ERROR") {
                var errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message){
                        console.log("Error Message: " + errors[0].message);
                    }
                }
                else{
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    SearchCustomer : function(component,event,helper,val){
         var action = component.get('c.checkCustomer');
         action.setParams({ searchKey : val,
                          });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var allValues = response.getReturnValue();
                component.set('v.isCustomerFalse', allValues);
                if(!component.get('v.isCustomerFalse')){
                    //alert('Sold');
                    helper.UpdateToDataBase(component,event,helper);
                    component.set("v.isModalOpen2",false);
                }
            }
            else if(state === "ERROR") {
                var errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message){
                        console.log("Error Message: " + errors[0].message);
                    }
                }
                else{
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    SaveToDataBase : function(component,event,helper){
        
        var action = component.get('c.saveCustomerDetails');
        var val=component.get("v.cName");
        var mobile=component.get("v.cMobile");
         action.setParams({ name : val,
                           mobile : mobile,
                           cart : JSON.stringify(component.get("v.cartList"))
                          });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                //var allValues = response.getReturnValue();
                component.set("v.count",0);
                var carts =new Array();
                component.set("v.cartList",carts);
                helper.showSuccess();
            }
            else if(state === "ERROR") {
                var errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message){
                        console.log("Error Message: " + errors[0].message);
                    }
                }
                else{
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    UpdateToDataBase : function(component,event,helper){
        
        var action = component.get('c.UpdateCustomer');
        var val=component.get("v.cName");
        var mobile=component.get("v.cMobile");
         action.setParams({ searchKey : mobile,
                           cart : JSON.stringify(component.get("v.cartList"))
                          });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                //var allValues = response.getReturnValue();
               // alert("Sold...");
                component.set("v.count",0);
                var carts =new Array();
                component.set("v.cartList",carts);
                helper.showSuccess();
            }
            else if(state === "ERROR") {
                var errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message){
                        console.log("Error Message: " + errors[0].message);
                    }
                }
                else{
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    showSuccess : function(){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been updated successfully.",
            type: 'success'
        });
        toastEvent.fire();
    }
});