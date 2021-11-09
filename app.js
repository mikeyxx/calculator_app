document.querySelector('#delete-btn').style.textTransform = "uppercase";
document.querySelector('.reset-btn').style.textTransform = "uppercase";

const themes = document.getElementsByName('radiobtn');

const container = document.body;

themes.forEach(theme => {
    theme.addEventListener('change', changeTheme)
});

function changeTheme(e) {
    const clicked = e.target.value;
    if (clicked == "btn-1") {
        container.classList.remove("theme-two", "theme-three");
    } else if (clicked == "btn-2") {
        container.classList.remove("theme-three");
        container.classList.add("theme-two")
    } else if (clicked == "btn-3") {
        container.classList.remove("theme-two");
        container.classList.add("theme-three")
    }
}
const calculator = document.querySelector('.calculator')
const buttons = calculator.querySelectorAll('button');
const display = calculator.querySelector('.calc-display');

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const key = e.target;
        const keyValue = key.textContent;
        const displayValue = display.textContent;
        const type = key.dataset.type;
        const previousKeyType = calculator.dataset.previousKeyType;
        //Is this a number key?
//         if(type === 'number') {
            if(displayValue === "0" || previousKeyType === 'operator') {
                display.textContent = keyValue;
            } else {
                display.textContent = displayValue + keyValue;
            }
            const currentActiveOperator = calculator.querySelector('[data-state="selected"]')
            if(currentActiveOperator) {
                currentActiveOperator.dataset.state = "";
            }

        //}        

        //Is this an operator key?
        if(type === 'operator') {
            const currentActiveOperator = calculator.querySelector('[data-state="selected"]')
            if(currentActiveOperator) {
                currentActiveOperator.dataset.state = "";
            }
            key.dataset.state = 'selected'
            //Save or get the firstNumber
            calculator.dataset.firstNumber = displayValue;
            //Also save the operator. The firstNum comes before an operator is clicked.
            calculator.dataset.operator = key.dataset.key;
        }

        if(type === 'equal') {
            //Perform a calculation
            const firstNumber = calculator.dataset.firstNumber
            const operator = calculator.dataset.operator;
            const secondNumber = displayValue
            display.textContent = calculate(firstNumber, operator, secondNumber)
        }

        if(type === 'clear') {
            //Reset the calculator
            display.textContent = '0'
            delete calculator.dataset.firstNumber
            delete calculator.dataset.operator
        }

        if(type === 'delete') {
            display.textContent = displayValue.slice(0, -1)
        }

        calculator.dataset.previousKeyType = type;
    })
})

function calculate(firstNumber, operator, secondNumber) {
    firstNumber = parseInt(firstNumber)
    secondNumber = parseInt(secondNumber)

    if(operator === 'plus') { return firstNumber + secondNumber }
    if(operator === 'minus') { return firstNumber - secondNumber }
    if(operator === 'times') { return firstNumber * secondNumber }
    if(operator === 'divide') { return firstNumber / secondNumber }

    // let result = ''
    // switch (operator) {
    //     case 'plus':
    //         result = firstNumber + secondNumber
    //         break;
    //     case 'minus':
    //         result = firstNumber - secondNumber
    //         break;
    //     case 'times':
    //         result = firstNumber * secondNumber
    //     case 'divide':
    //         result = firstNumber / secondNumber
    // }
    
    // return result
            
}


