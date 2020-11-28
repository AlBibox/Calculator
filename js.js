let screen = document.querySelector(".container__screen__new");
let oldScreen = document.querySelector(".container__screen__old");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let equal = document.querySelector(".equal");
let reset = document.querySelector(".reset");
let deleteValue = document.querySelector(".deleteValue");
let changeSign = document.querySelector(".changeSign");
let floatPoint = document.querySelector(".floatPoint");


let firstStored = null;
let secondStored = null;
let operator = null;
let oldOperator = null;
screen.textContent = 0;
oldScreen.textContent = "";


function add(firstStored, secondStored){
    return parseFloat(firstStored) + parseFloat(secondStored);
}


function subtract(firstStored, secondStored) {
    return parseFloat(firstStored) - parseFloat(secondStored);
}


function divide(firstStored, secondStored) {
    return parseFloat(firstStored) / parseFloat(secondStored);
}


function multiply(firstStored, secondStored) {
    return parseFloat(firstStored) * parseFloat(secondStored);
}


function operate(operator, firstStored, secondStored) {
    if (operator == "+") {
        firstStored = add(firstStored, secondStored);       
    }
    else if (operator == "-") {
        firstStored = subtract(firstStored, secondStored);
    }
    else if (operator == "/") {
        firstStored = divide(firstStored, secondStored);
    }
    else if (operator == "*") {
        firstStored = multiply(firstStored, secondStored);
    } 
    return firstStored;
}


function returnOperator(n) {
    let value = n.target.value;
    operator = value;
    
    if (firstStored != null && oldOperator && secondStored){
        firstStored = operate(oldOperator, firstStored, secondStored);
        secondStored = null;       
    }
    oldScreen.textContent = `${firstStored} ${operator}`;
    screen.textContent = "";  
}


function returnValue(n) {
    let value = n.target.value;

    if ((firstStored == null || firstStored == "0" ) && !operator && secondStored == null ){
        firstStored = value; 
        screen.textContent = firstStored;
    }  
    else if (firstStored != null && !operator && secondStored == null && firstStored.length < 29){
        firstStored += value;
        screen.textContent = firstStored;        
    } 
    else if (firstStored != null && operator && (secondStored == "0" || secondStored == null)){
        secondStored = value;
        oldScreen.textContent = `${firstStored} ${operator} ${secondStored}`;
        screen.textContent = "";
        oldOperator = operator;
    }
    else if (firstStored != null && operator && secondStored != null && secondStored.length < 29){
        secondStored += value;
        oldScreen.textContent = `${firstStored} ${operator} ${secondStored}`;
        screen.textContent = "";      
    }   
}
numbers.forEach((single) => { single.addEventListener('click', returnValue) });
operators.forEach((single) => { single.addEventListener('click', returnOperator) });


function result(){
    if (secondStored != null) {
        firstStored = operate(oldOperator, firstStored, secondStored);
        secondStored = null;
        screen.textContent = firstStored;
        oldScreen.textContent = ``;
    }
}
equal.addEventListener("click", result);


reset.addEventListener("click", () => {
    firstStored = null;
    secondStored = null;
    operator = null;
    oldOperator = null;
    screen.textContent = 0;
    oldScreen.textContent = "";
});


changeSign.addEventListener("click", () => {   
    if(operator == null && firstStored != null){
        firstStored = -firstStored; 
        screen.textContent = firstStored;
    }
    else if (operator != null && firstStored != null && secondStored != null){
        secondStored = -secondStored;
        oldScreen.textContent = `${firstStored} ${operator} ${secondStored}`;
    } 
});

function float(){
    if (firstStored == null || firstStored == "0") {
        firstStored = "0.";
        screen.textContent = firstStored;
    } else if (operator != null && (secondStored == null || secondStored == "0") && !secondStored.includes(".")) {
        secondStored = "0.";
        oldScreen.textContent = `${firstStored} ${operator} ${secondStored}`;
    } else if (secondStored == null && firstStored != null && firstStored != "0" && !firstStored.includes(".")) {
        firstStored += ".";
        screen.textContent = firstStored;
    }
    else if (operator != null && secondStored != null && firstStored != null && secondStored != "0" && !secondStored.includes(".")) {
        secondStored += ".";
        oldScreen.textContent = `${firstStored} ${operator} ${secondStored}`;
    }
}

floatPoint.addEventListener("click", float);


deleteValue.addEventListener("click", () => {
    if(firstStored != null && secondStored == null && operator == null){
        if(firstStored.length - 1 > 0){
            firstStored = firstStored.slice(0, (firstStored.length - 1));
            screen.textContent = firstStored;
        }
        else if (firstStored.length - 1 == 0){
            firstStored = null;
            screen.textContent = 0;
        }
    }
    else if (firstStored != null && secondStored != null){
        if (secondStored.length - 1 > 0) {
            secondStored = secondStored.slice(0, (secondStored.length - 1));
            oldScreen.textContent = `${firstStored} ${operator} ${secondStored}`;
        }
        else if (secondStored.length - 1 == 0) {
            secondStored = null;
            oldScreen.textContent = `${firstStored} ${operator}`;
        }
    }   
});

/*KEYBOARD SUPPORT */

let currentKey = null;
let currentKeyOperator = null;

function keyboardNumber(key){   
    switch(key){
        case '0':
            currentKey = key;
            break;
        case '1':
            currentKey = key;
            break;
        case '2':
            currentKey = key;
            break;
        case '3':
            currentKey = key;
            break;
        case '4':
            currentKey = key;
            break;
        case '5':
            currentKey = key;
            break;
        case '6':
            currentKey = key;
            break;
        case '7':
            currentKey = key;
            break;
        case '8':
            currentKey = key;
            break;
        case '9':
            currentKey = key;
            break;
        default:
            currentKey = "stop";
            break;
    }
    if ((firstStored == null || firstStored == "0") && !operator && secondStored == null && currentKey != "stop") {
        firstStored = currentKey;
        screen.textContent = firstStored;
    }
    else if (firstStored != null && !operator && secondStored == null && firstStored.length < 29 && currentKey != "stop") {
        firstStored += currentKey;
        screen.textContent = firstStored;
        
    }
    else if (currentKey != "stop" && firstStored != null && operator && (secondStored == "0" || secondStored == null)) {
        secondStored = currentKey;
        oldScreen.textContent = `${firstStored} ${operator} ${secondStored}`;
        screen.textContent = "";
        oldOperator = operator;
    }
    else if (currentKey != "stop" && firstStored != null && operator && secondStored != null && secondStored.length < 29) {
        secondStored += currentKey;
        oldScreen.textContent = `${firstStored} ${operator} ${secondStored}`;
        screen.textContent = "";
    }
}


function keyboardOperator(key) {  
    switch (key) {
        case '+':
            currentKeyOperator = key;
            break;
        case '-':
            currentKeyOperator = key;
            break;
        case '*':
            currentKeyOperator = key;
            break;
        case '/':
            currentKeyOperator = key;
            break;
        case 'Enter':
            currentKeyOperator = key;
            break;
        case '.':
            currentKeyOperator = key;
            break;
        default:
            currentKeyOperator = "stop";
            break;
    }
    if (currentKeyOperator != "stop" && currentKeyOperator != "Enter" && currentKeyOperator != ".") {
        operator = currentKeyOperator;

        if (firstStored != null && oldOperator && secondStored) {
            firstStored = operate(oldOperator, firstStored, secondStored);
            secondStored = null;
        }
        oldScreen.textContent = `${firstStored} ${operator}`;
        screen.textContent = "";
    }
    else if (currentKeyOperator == "Enter" && secondStored != null){
        result();
    }
    else if (currentKeyOperator == "." && currentKeyOperator != "Enter" && currentKeyOperator != "stop"){
        float();
    }
}

document.addEventListener('keydown', (e) => keyboardNumber(e.key));
document.addEventListener('keydown', (e) => keyboardOperator(e.key));



 
