    const calculator = document.querySelector('.calculator');
    const mainValueDisplay = document.querySelector('.main-value');
    let firstValue = '';
    let secondValue = '';
    let currentOperator = '';
    let result = '';

    getUserInput();

    function add(num1, num2) {
        return num1 + num2;
    }

    function subtract(num1, num2) {
        return num1 - num2;
    }

    function multiply(num1, num2) {
        return num1 * num2;
    }

    function divide(num1, num2) {
        if (num2 === 0) return 'ERROR';
        return num1 / num2;
    }

    document.addEventListener("keypress", function(event) {
        if (event.key >= '0' && event.key <= '9') {
            determineInputType(true, event.key);
        } else if (['+', '-', '*', '/', '=', 'Enter', 'C', 'c'].includes(event.key)) {
            determineInputType(false, event.key);
        }
    }); 


    function determineInputType(numberKeyBool, value) {
        if (numberKeyBool === true) {
            concatenateInputs(value)
        } else {
            calculateInputs(value)
        };
    };

    function getUserInput () {
        calculator.addEventListener("click", (e) => {
            if (!e.target.classList.contains('btn')) return;

            if (e.target.classList.contains('operator')) {
                determineInputType(false, e.target.dataset.value);
            } else {
                determineInputType(true, e.target.dataset.value)
            }
        });
    }

    function performCalculations () {
        const num1 = parseFloat(firstValue);
        const num2 = parseFloat(secondValue);

        switch (currentOperator) {
            case '+':
                result = add(num1, num2)
                break;
            case '-':
                result = subtract(num1, num2)
                break;
            case '*':
                result = multiply(num1, num2)
                break;
            case '/':
                result = divide(num1, num2)
                break;
            default:
                return;
        }
        updateMainValueDisplay(result);
        firstValue = result;
        secondValue = '';
        currentOperator = '';   
    };

    function calculateInputs(operator) {
        if (operator === 'C') {
            resetCalc();
            return;
        }
        
        if (operator === '=' || operator === 'Enter') {
            if (secondValue !== '' && firstValue !== '' && currentOperator !== '') {
                performCalculations();
            }
            return;
        }

        if (secondValue === '' && firstValue === '') {
            return;
        }

        if (secondValue !== '' && firstValue !== '') {
            performCalculations()
        }

        currentOperator = operator;
        
    };

    function concatenateInputs (userInput) {
        if (result !== '' && currentOperator === '') {
            resetCalc();
            firstValue = userInput;
            updateMainValueDisplay(firstValue);
            return;
        }

        if (currentOperator === '') {
            firstValue += userInput;
            updateMainValueDisplay(firstValue)
            return;
        } 

        if (currentOperator !== '') {
            secondValue += userInput;
            updateMainValueDisplay(secondValue)
            return;
        }
    };

    function updateMainValueDisplay(displayValue) {
        mainValueDisplay.textContent = displayValue;
    };

    function resetCalc () {
        firstValue = '';
        secondValue = '';
        currentOperator = '';
        result = '';
        updateMainValueDisplay(firstValue);
    }