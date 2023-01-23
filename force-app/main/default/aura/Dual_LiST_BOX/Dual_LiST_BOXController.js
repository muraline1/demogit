({
	handleChange: function (cmp, event) {
        // This will contain an array of the "value" attribute of the selected options
        var selectedOptionValue = event.getParam("value");
        
        alert("Option selected with value: '" + selectedOptionValue);
    }
})