class Calculator {
    constructor(previousOperandText, currentOperandText)
    {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand += number
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand != '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(current) || isNaN(previous)) return

        switch (this.operation)
        {
            case '+':
                computation = previous + current
                break
            case '-':
                computation = previous - current
                break
            case '*':
                computation = previous * current
                break
            case '/':
                computation = previous / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerPart = parseFloat(stringNumber.split('.')[0])
        const decimalPart = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerPart)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerPart.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalPart != null) {
            return `${integerDisplay}.${decimalPart}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)}${this.operation}`
        } else {
            this.previousOperandText.innerText = ''
        }
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[date-all-clear]')

const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})