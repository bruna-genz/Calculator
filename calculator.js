const operation = document.createElement("div");
operation.classList.add("operation");
downNumber.appendChild(operation);


const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        changeDisplay(button.id); 
    })
})

document.addEventListener("keydown", (e) => {
        getKeyCode();
    })

function getKeyCode() {
    if (event.key == "Enter") {
        changeDisplay("equal")
    } else if (event.key == "*") { 
        changeDisplay("x") 
    } else if (event.key == "/") {
        changeDisplay("÷")
    } else if (event.key == "Backspace") {
        changeDisplay("backspace")
    } else {
        changeDisplay(event.key)
    }
};

let currentNumberArray = [];  
let currentNumber;
let previousNumber;
let operator;
let isFirstOperation = true;
let upDisplay = "";
let isDecimal = false;
let lastIsOperator = false;
let lastIsEqual = false;

function changeDisplay(id) {     
    if (isNumber(id)) {
        if (lastIsEqual) {
            clearDisplay();
            lastIsEqual = false;
        }

        currentNumberArray.push(id);
        currentNumber = Number(currentNumberArray.join(""));
        downNumber.textContent = currentNumber;
        lastIsOperator = false;
    } else if (id == ".") {
        lastIsEqual = false;
        if (!isDecimal && currentNumberArray.length !== 0) {
            currentNumberArray.push(id); 
            currentNumber = currentNumberArray.join("");
            downNumber.textContent = currentNumber;
            lastIsOperator = false;
            isDecimal = true;
        }
    } else if (id == "clear") {
        clearDisplay();
    } else if (isOperator(id)) {
        lastIsEqual = false;
        if (currentNumberArray.length === 0 && !Number.isInteger(Number(previousNumber)) && !Number.isInteger(Number(secondNumber))) {
            clearDisplay();
        } else if (isFirstOperation) {
            previousNumber = currentNumber;
            upDisplay = previousNumber + " " + id; 
            isFirstOperation = false;
            lastIsOperator = true;  
            operator = id;
            upNumber.textContent = upDisplay;
            currentNumberArray = [];          
        } else {
            if (!lastIsOperator) {
                upDisplay += " " + currentNumber + " " + id;
                previousNumber = operate(operator, previousNumber, currentNumber);
                lastIsOperator = true;
                operator = id;
                upNumber.textContent = upDisplay;
                currentNumberArray = [];
            }
        } 
    } else if (id == "equal") {
        upDisplay = "";
        currentNumber = operate(operator, previousNumber, currentNumber);
        currentNumberArray = currentNumber.toString().split("")
        printResult(currentNumber)
        operator = "";
        lastIsOperator = false;
        upNumber.textContent = upDisplay;
        lastIsEqual = true;
        isFirstOperation = true;
        
        
    } else if (id == "backspace") {
        eraseLastChar();
    }
}

function isNumber(id) {
    if (id >= 0 && id <= 9) {
        return true;
    } else {
        return false;
    }
}

function isOperator(id) {
    if (id == "+" || id == "-" || id == "x" || id == "÷") {
        return true;
    } else {
        return false;
    }
}

function operate(operator, x, y) {
    if (operator == "+") {
        return add(x, y);
    } else if (operator == "-") {
        return subtract(x, y);
    } else if (operator == "x") {
        return multiply(x, y);
    } else if (operator == "÷") {
        return divide(x, y);
    }
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    let division = x / y;
    if(y == 0) {
        division = "Cannot divide by 0"
    }
    return division;
}

function printResult(result) {
    downNumber.textContent = result;
}

function clearDisplay() {
    currentNumberArray = []; 
    previousNumber = "";
    currentNumber = "";
    downNumber.textContent = 0;
    upNumber.textContent = "";
    isFirstOperation = true;
    lastIsOperator = false;
    isDecimal = false;
}

function eraseLastChar() {
    if (!lastIsOperator) {
        currentNumberArray.pop();
        currentNumber = currentNumberArray.join("");
        downNumber.textContent = currentNumber;
        if (currentNumberArray.length === 0) {
            downNumber.textContent = "0";
        }
    }
}
