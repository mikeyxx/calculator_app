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
const display = calculator.querySelector('.calc-display');
const keys = calculator.querySelector('.calc-keys');


keys.addEventListener('click', (e) => {
    const key = e.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const type = key.dataset.type
    const previousKeyType = calculator.dataset.previousKeyType

if(type === 'number') {
    if(displayValue === '0' || previousKeyType === 'operator') {
        display.textContent = keyValue
    } else {
        display.textContent = displayValue + keyValue
    }
    const pressedOpKeys = keys.querySelectorAll('[data-type="operator"]')
    pressedOpKeys.forEach(el => { el.dataset.state = '' })
}

if(type === 'operator') { 
    //To temporarily remove the state/classList from the operator key that was pressed
    const pressedOpKeys = keys.querySelectorAll('[data-type="operator"]')
    pressedOpKeys.forEach(el => { el.dataset.state = '' })

    //We need to save/detect the firstNumber
    calculator.dataset.firstNumber = displayValue

    //We need to save/detect the operator key pressed
    calculator.dataset.operator = key.dataset.key

    //This adds something like a classList to the operator keys
    key.dataset.state = 'selected'
}

if(type === 'equal') {
    //perform a calculation
    const firstNumber = calculator.dataset.firstNumber
    const operator = calculator.dataset.operator
    const secondNumber = displayValue
    display.textContent = calculate(firstNumber, operator, secondNumber)
    
}

if(type === 'delete') {
    display.textContent = displayValue.slice(0, -1)
}

if(type === 'clear') {
    display.textContent = '0'
    delete calculator.dataset.firstNumber
    delete calculator.dataset.operator
    const pressedOpKeys = keys.querySelectorAll('[data-type="operator"]')
    pressedOpKeys.forEach(el => { el.dataset.state = '' })
}
//To save/detect the previous key type that was pressed. We can do this by saving that calculator state somewhere. We can achieve that like this: const state {}. This lets us keep a state in a variable or we can just save the state in the html:
calculator.dataset.previousKeyType = type
})

let result = ''
    function calculate(firstNumber, operator, secondNumber) {
        if(operator === 'plus') {
        result = parseFloat(firstNumber) + parseFloat(secondNumber)
        } else if(operator === 'minus') {
            result = parseFloat(firstNumber) - parseFloat(secondNumber)
        } else if(operator === 'divide') {
            result = parseFloat(firstNumber) / parseFloat(secondNumber)
        } else if(operator === 'times') {
            result = parseFloat(firstNumber) * parseFloat(secondNumber)
        }
        return result
    }


// buttons.forEach((button) => {
//     button.addEventListener('click', (e) => {
//         const key = e.target;
//         const keyValue = key.textContent;
//         const displayValue = display.textContent;
//         const type = type;
//         const previousKeyType = calculator.dataset.previousKeyType;
//         //Is this a number key?


    // const result = ''
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
            
//}


