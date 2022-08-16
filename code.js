
class Caculator {
    constructor(previousOperandElement, currentOperandElement){
        this.previousOperandElement= previousOperandElement
        this.currentOperandElement = currentOperandElement
        this.clear()
    }

    clear(){
        this.previousOperand= ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    // lặp numberBtn ở dưới rồi gán vào đây qua number
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return // return ở cuối là lệnh if kia chạy dc thì dừng luôn, đong này, không muốn đi thêm nữa, cái này có thể cho là return trắng, kết thúc lệnh
        this.currentOperand = this.currentOperand.toString() + number.toString()// chuỗi cộng chuỗi = chuỗi
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand// nhận giá trì từ ở ô to lên ô nhỏ
        this.currentOperand = '' // chuyền cho thằng nhỏ xong thì thằng to xóa luôn
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand) // ép về kiểu số 
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return  // nếu ô to và nhỏ đều không nhập số thì dựng hàm luôn
        switch(this.operation){
            case'+':
                computation = prev + current
                break
            case'×':
                computation = prev * current
                break
            case'-':
                computation = prev - current
                break
            case'÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay 

        if(isNaN(intergerDigits)){
            intergerDisplay = ''
        }else{
            intergerDisplay = intergerDigits.toLocaleString('en',{
                maximumFractionDigits: 0
            })
        }

        if(decimalDigits != null){
            return `${intergerDigits}.${decimalDigits}`
        }else{
            return intergerDisplay
        }
       
    }

    updateDisplay(){
        this.currentOperandElement.innerText =  
            this.getDisplayNumber(this.currentOperand)//số đã nhồi
        if(this.operation != null){
            this.previousOperandElement.innerText =  
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` // show giá trị từ ô nhỏ ra

        }else{
            this.previousOperandElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear]')
const previousOperandElement = document.querySelector('[data-previous-operand]')
const currentOperandElement = document.querySelector('[data-current-operand ]')


const caculator = new Caculator(previousOperandElement, 
    currentOperandElement)

numberButtons.forEach(button => {
    button.addEventListener('click',()=>{
        caculator.appendNumber(button.innerText)// lấy vị tri số tương ứng khi click
        caculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click',()=>{
        caculator.chooseOperation(button.innerText)// lấy vị tri số tương ứng khi click
        caculator.updateDisplay()
    })
})

equalsButtons.addEventListener('click', button =>{
    caculator.compute()
    caculator.updateDisplay()

})

allClearButtons.addEventListener('click', button =>{
    caculator.clear()
    caculator.updateDisplay()

})

deleteButtons.addEventListener('click', button =>{
    caculator.delete()
    caculator.updateDisplay()

})