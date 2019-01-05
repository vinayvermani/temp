# temp

var condition = "hardware=desktop,quantity<5,price>200,bool=false,flt<15.56";
var obj = {
  hardware: "desktop",
  quantity: 2,
  price: 300,
  bool: false,
  flt: 10.4677
  
};

function validate(condition, obj) {
  var checks = condition.split(",");
  var lessThanChecks = checks.filter(check => check.indexOf("<") > 0);
  var greaterThanChecks = checks.filter(check => check.indexOf(">") > 0);
  var equalChecks = checks.filter(check => check.indexOf("=") > 0);
  var lessThanCheckResult =
    lessThanChecks.length < 1 ? true : validateChecks("<", lessThanChecks);
  var greaterThanCheckResult =
    greaterThanChecks.length < 1
      ? true
      : validateChecks(">", greaterThanChecks);
  var equalCheckResult =
    equalChecks.length < 1 ? true : validateChecks("=", equalChecks);
  console.log(lessThanChecks);
  console.log(greaterThanChecks);
  console.log(equalChecks);
  return lessThanCheckResult && greaterThanCheckResult && equalCheckResult;
  
  function validateChecks(operator, checks) {
    for (var i = 0; i < checks.length; i++) {
      var conditionVariable = checks[i].split(operator)[0];
      var conditionVal = checks[i].split(operator)[1];
      if (hasProperty(obj,conditionVariable)) {
        var objVal=obj[conditionVariable];
        objVal = typeof objVal === "string" ?  objVal.trim() : objVal;
        objVal = typeof objVal === "bool" ? objVal.toString() : objVal;
        
        conditionVal = typeof objVal === "number" ? parseFloat(conditionVal) : conditionVal;
        
        //console.log(typeof conditionVal + "-"+conditionVariable);
        
        if (operator === "=" && conditionVal!==objVal.toString()) { 
          return false;
        }
        if (operator === "<" && !(objVal < conditionVal) ) {
          return false;
        }
        if (operator === ">" && !(objVal > conditionVal)) {
          return false;
        }
      }
    }
    return true;
  }

  function hasProperty(obj, property) {
  
    return Object.keys(obj).filter(function(prop) {
      return prop === property;
    }).length > 0
      ? true
      : false;
  }
}

console.log(validate(condition, obj));
