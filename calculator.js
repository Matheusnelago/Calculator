class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '/':
                computation = prev / current
                break;
            case '*':
                computation = prev * current
                break;
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            default:
                return;
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText =
        this.getDisplayedNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerText =
            `${this.previousOperand} ${this.operation}`;
        }else{
            this.previousOperandTextElement.innerText = '';
        }
    }
    getDisplayedNumber(number){
        const stringNumber = number.toString()
        const intergerDigit = parseFloat(stringNumber.split('.')[0]);
        const decimalDigit = (stringNumber.split('.')[1])
        let intergerDisplay
        if(isNaN(intergerDigit)){
            intergerDisplay = ''
        }else{
            intergerDisplay = intergerDigit.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigit != null){
            return `${intergerDisplay}.${decimalDigit}`
        }else{
            return intergerDisplay
        }
    }
}

const numberButtons = document.querySelectorAll('[data-numbers]');
const operatorButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault()
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault()
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
});

equalsButton.addEventListener('click', button => {
    button.preventDefault()
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})