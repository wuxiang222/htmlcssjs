;(function(window){
    var getFormData = function(selector){
        var formData = {};

        var inputs = document.querySelector(selector).elements
        for (var i = 0; i < inputs.length; i++) {
            var _input = inputs[i];
            if (_input.disabled) continue;
    
            var type = _input.type
            var name = _input.name;
            var value = _input.value;
            // console.log("type="+type, "name="+name, ", "value="+value)
    
            switch (type) {
                case "text":
                    if (_input.multiple) {
                        formData[name] = value ? value.split(",") : []
                    } else {
                        formData[name] = value;
                    }
                    break;
                case "select-one":
                    formData[name] = _input.selectedOptions.length ? inputs[i].selectedOptions.item(0).value : "";
                    break;
                case "select-multiple":
                    var arrValue = [];
                    for (var j = 0; j < _input.selectedOptions.length; j++) {
                        arrValue.push(_input.selectedOptions.item(j).value)
                    }
    
                    formData[name] = arrValue;
                    break;
                case "checkbox":
                    formData[name] = formData[name] ? formData[name] : [];
                    if (_input.checked) {
                        formData[name].push(value)
                    }
                    break;
                case "radio":
                    if (inputs[i].checked) {
                        formData[name] = value;
                    }
                    break;
                default: // "password","textarea"
                    formData[name] = value;
                    break;
            }
        }
    
        return formData;
    }

    // 全局变量
    window.getFormData = getFormData;
})(window)