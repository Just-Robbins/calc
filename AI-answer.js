const calculator = document.querySelector('.calculator');
const mainValueDisplay = document.querySelector('.main-value');
let firstValue = '';
let secondValue = '';
let currentOperator = '';
let result = '';

getUserInput();
updateMainValueDisplay('0');

function calculate(num1, num2, operator) {
    if (operator === '/' && num2 === 0) return 'ERROR';
    
    const operations = {
        '+': num1 + num2,
        '-': num1 - num2,
        '*': num1 * num2,
        '/': num1 / num2
    };
    return operations[operator];
}

document.addEventListener("keydown", function(event) {
    if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
        handleInput(event.key);
    } else if (['+', '-', '*', '/', '=', 'Enter', 'c', 'C'].includes(event.key)) {
        const key = event.key === 'Enter' ? '=' : event.key.toUpperCase();
        handleInput(key);
    }
}); 

function handleInput(value) {
    if (!isNaN(value) || value === '.') {
        concatenateInputs(value);
    } else {
        calculateInputs(value);
    }
}

function getUserInput() {
    calculator.addEventListener("click", (e) => {
        if (!e.target.classList.contains('btn')) return;
        handleInput(e.target.dataset.value);
    });
}

function performCalculations() {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(secondValue);

    result = calculate(num1, num2, currentOperator);
    
    // Format result to avoid floating point issues
    if (result !== 'ERROR' && !Number.isInteger(result)) {
        result = parseFloat(result.toFixed(8));
    }
    
    updateMainValueDisplay(result);
    firstValue = String(result);
    secondValue = '';
    currentOperator = '';   
}

function calculateInputs(operator) {
    if (operator === 'C') {
        resetCalc();
        return;
    }
    
    if (operator === '=') {
        if (secondValue !== '' && firstValue !== '' && currentOperator !== '') {
            performCalculations();
        }
        return;
    }
    
    if (secondValue === '' && firstValue === '') {
        return;
    }

    if (secondValue !== '' && firstValue !== '') {
        performCalculations();
    }

    currentOperator = operator;
}

function concatenateInputs(userInput) {
    // Start fresh after getting a result
    if (result !== '' && currentOperator === '') {
        resetCalc();
    }
    
    // Building first number
    if (currentOperator === '') {
        // Prevent multiple decimal points
        if (userInput === '.' && firstValue.includes('.')) return;
        firstValue += userInput;
        updateMainValueDisplay(firstValue);
    } 
    // Building second number
    else {
        // Prevent multiple decimal points
        if (userInput === '.' && secondValue.includes('.')) return;
        secondValue += userInput;
        updateMainValueDisplay(secondValue);
    }
}

function updateMainValueDisplay(displayValue) {
    mainValueDisplay.textContent = displayValue;
}

function resetCalc() {
    firstValue = '';
    secondValue = '';
    currentOperator = '';
    result = '';
    updateMainValueDisplay('0');
}