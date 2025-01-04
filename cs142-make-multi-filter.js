"use strict";

function cs142MakeMultiFilter (originalArray) {
    let currentArray = originalArray;
    return function arrayFilterer (filterCriteria, callback) {
        
        if(!(filterCriteria instanceof Function)) {
            return currentArray;
        }     
        currentArray = currentArray.filter(filterCriteria);
        if(callback instanceof Function) {
            callback.call(originalArray, currentArray);
        }
        return arrayFilterer;
        
    };
}