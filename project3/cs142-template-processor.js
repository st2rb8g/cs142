"use strict";

function Cs142TemplateProcessor(template) {
    this.template = template;

    
}

Cs142TemplateProcessor.prototype.fillIn = function(dictionary) {
    for(const key in dictionary) {
        if(Object.hasOwnProperty.call(dictionary, key)) {
            var key_str = "{{"+key+"}}";
            var reg = new RegExp(key_str, "g");
            this.template = this.template.replace(reg, dictionary[key]);
        }
    }
    this.template.replace(/{{\w*}}/g, "");
    return this.template;
};