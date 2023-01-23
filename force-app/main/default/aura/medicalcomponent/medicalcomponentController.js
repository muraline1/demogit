({
     onChange1: function (component, evt, helper) {
         var selectedLimit = component.find('searchField').get('v.value');
         

         component.set('v.searchKeyword', selectedLimit);
        helper.SearchHelper(component, event);
    },
    
     next: function (component, evt, helper) {
         var val=component.find("mobile").get("v.value");
         component.set("v.isModalOpen1",false);
         component.set("v.isModalOpen2",true);
         helper.SearchCustomer(component, evt,helper,val);
    },
    
    save: function (component, evt, helper) {
         
         component.set("v.isModalOpen1",false);
         component.set("v.isModalOpen2",false);
         helper.SaveToDataBase(component, evt, helper);
    },
    
    addMed : function(component, evt, helper) {
        //alert(evt.target.getAttribute("data-row-index"));
        component.set("v.count",component.get("v.count")+1);
        var indx=evt.target.getAttribute("data-row-index");
        var val=component.get("v.accList");
        console.log('vvvv',val);
        var item=val[indx];
        
        item=JSON.parse(JSON.stringify(item));
        
        
        var carts=component.get("v.cartList");
        
        if(carts.length>0){
        	carts.splice(carts.length-1,1);    
        }
        
        
        
        var qty=0;
        for(var i=0;i<carts.length;i++){
            if(carts[i].Id ==item.Id){
                qty=carts[i].qty;
                carts.splice(i,1);
                break;
            }
        }
        qty++;
        
        item.price=qty*parseInt(item.Price__c);
        item.qty=qty;
        
       
        var totalItem=new Object();
        totalItem.Name='Total';
        totalItem.price=parseInt(component.get("v.total"))+item.Price__c;
        component.set("v.total",totalItem.price);
        
        carts.push(item);
        carts.push(totalItem);
        component.set("v.cartList",carts);
       /* var mdlist=new Map(Object.entries(JSON.parse(component.get("v.medList"))));
       // mdlist.set('two','2');
       alert('Great');
        console.log('medlist',mdlist);
        if(mdlist.has(id)){
            mdlist.set(id,mdlist.get(id)+1);
        }else{
            mdlist.set(id,1);
        }
        component.set("v.medList",JSON.stringify(Object.fromEntries(mdlist)));
        console.log('Stringi',JSON.stringify(mdlist));
        console.log('b after',mdlist);
        console.log('after',JSON.parse(JSON.stringify(component.get("v.medList")))); */
    },
    
    handleRemove : function(component, evt, helper){
        
        var indx=evt.target.getAttribute("data-row-index");
        var carts=component.get("v.cartList");
        
        console.log('carts',JSON.stringify(carts));
       	
        if(carts.length>0){
        	carts.splice(carts.length-1,1);    
        }
        
        var item=carts[indx];
        console.log('strings',JSON.stringify(item));
        
        item=JSON.parse(JSON.stringify(item));
        //component.set("v.total",component.get("v.total")-item.price);
        
        for(var i=0;i<carts.length;i++){
            if(item.Name!='Total' && carts[i].Id ==item.Id){
                carts.splice(i,1);
                break;
            }
        }
        
        var totalItem=new Object();
        totalItem.Name='Total';
        totalItem.price=parseInt(component.get("v.total"))-item.Price__c;
        component.set("v.total",totalItem.price);
        
        carts.push(totalItem);
        component.set("v.cartList",carts);
        
    },
    
    handleClear : function(component, evt, helper){
        var arr=new Array();
        component.set("v.cartList",arr);
        component.set("v.total",0);
        component.set("v.count",0);
    },
    
    handleSell : function(component, evt, helper){
        component.set("v.isModalOpen1",true);
    },
    
    closeModal1 : function(component, evt, helper){
        component.set("v.isModalOpen2",false);
    }
    



})