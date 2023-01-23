({
	searchme : function(component, event, helper)
    {
        var columns = [
            {label:"Accont Name",fieldName:"Name", type:"text"},
            {label:"Accont Phone",fieldName:"Phone", type:"phone"},
            {label:"Accont Fax",fieldName:"Fax", type:"phone"},
            {label:"Accont Industry",fieldName:"Industry", type:"text"},
            {label:"Accont Rating",fieldName:"Rating", type:"text"}
            
        ];
        component.set("v.col",columns);
        
		var ts = component.get("v.stxt");
        var action= component.get("c.getmyacc");
        action.setParams({"searchtext":ts});
        action.setCallback(this,function(response){
            var state=response.getState();
            if(state=='SUCCESS')
                {
                    var results =response.getReturnValue();
                    component.set("v.acclist",results);
                }                                    
        });
        $A.enqueueAction(action);                   
        
	}
})