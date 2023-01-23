({
	  loginPage : function(component, event, helper) {
        var action = component.get("c.getFlight");
        
        var userid = component.get("v.Empiduser"); 
        var pass= component.get("v.Empidpwd");
        
        if($A.util.isEmpty(userid ) || $A.util.isUndefined(userid )){
            alert('Please Enter User Name!');
            return;
        }   
         if($A.util.isEmpty(pass) || $A.util.isUndefined(pass)){
            alert('Please Enter Password!');
            return;
        } 
          action.setParams({
              username:userid ,
              userpassw:pass
        });
          action.setCallback(this,function(a){
              var rtnValue = a.getReturnValue();
              alert(rtnValue);
              console.log('The field list is :'+JSON.stringify(a.getReturnValue()));
          });
         $A.enqueueAction(action);
         component.set("v.userid ",'');
         component.set("v.pass",'');
    }
})