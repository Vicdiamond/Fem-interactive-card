'use strict'

const cardName = document.querySelector('.card-name')
const cardNum = document.querySelector('.card-num')
const cardMM = document.querySelector('.card-mm')
const cardYY = document.querySelector('.card-yy')
const cardCVC = document.querySelector('.card-cvc')
const mainEl = document.querySelector('.main')
const completeEl = document.querySelector('.complete')
const filledName = document.querySelector('.filled-name')
const filledNum = document.querySelector('.filled-number')
const filledCVC = document.querySelector('.filled-cvc')
const filledMM = document.querySelector('.filled-mm')
const filledYY = document.querySelector('.filled-yy')

const btnSubmit = document.querySelector('.btn-submit')
const btnContinue = document.querySelector('.btn-continue')

// Functions

const containsAlphabet = function (inputValue) {
  for (let i = 0; i < inputValue.length; i++) {
    if (
      (inputValue[i] >= 'a' && inputValue[i] <= 'z') ||
      (inputValue[i] >= 'A' && inputValue[i] <= 'Z')
    ) {
      return true
    }
  }
  return false
}

const clearInputField = function () {
  cardName.value = ''
  cardNum.value = ''
  cardMM.value = ''
  cardYY.value = ''
  cardCVC.value = ''
}

const clearCompletedInput = function () {
  filledCVC.textContent = '000'
  filledName.textContent = 'JANE APPLESEED'
  filledNum.textContent = '0000 0000 0000 0000'
  filledMM.textContent = '00'
  filledYY.textContent = '00'
}

const checkEmptyInputs = function () {
  if (
    cardName.value === '' ||
    cardNum.value === '' ||
    cardMM.value === '' ||
    cardYY.value === '' ||
    cardCVC.value === ''
  ) {
    return false
  } else {
    return true
  }
}
const limitInputLength = function (input, maxLength) {
  const inputValue = input.value.toString()

  if (inputValue.length > maxLength) {
    input.value = inputValue.slice(0, maxLength)
  }
}

// Event listeners
document.querySelector('.contain').addEventListener('click', function (e) {
  const clicked = e.target.closest('.card')

  if (!clicked) return

  clicked.addEventListener('mouseout', function () {
    if (clicked.value === '') {
      e.target.classList.add('border-red-500')
      clicked.nextElementSibling.classList.remove('hidden')
    } else {
      e.target.classList.remove('border-red-500')
      clicked.nextElementSibling.classList.add('hidden')
    }

    // for the card number
    if (clicked.classList.contains('card-num')) {
      const clickedValue = clicked.value
      console.log(clickedValue)
      const containsAlphabetChar = containsAlphabet(clickedValue)
      if (containsAlphabetChar) {
        clicked.nextElementSibling.textContent = 'Wrong format, numbers only'
        e.target.classList.add('border-red-500')
        clicked.nextElementSibling.classList.remove('hidden')
      } else {
        e.target.classList.remove('border-red-500')
        clicked.nextElementSibling.classList.add('hidden')
      }
      if (clicked.value === '') {
        clicked.nextElementSibling.textContent = `Can't be blank`
        clicked.nextElementSibling.classList.remove('hidden')
        e.target.classList.add('border-red-500')
      }
    }
  })

  //   Checking required input length
  if (
    clicked.classList.contains('card-mm') ||
    clicked.classList.contains('card-yy')
  ) {
    clicked.addEventListener('input', function () {
      limitInputLength(this, 2)
    })
  }

  if (clicked.classList.contains('card-num')) {
    clicked.addEventListener('input', function () {
      limitInputLength(clicked, 19)
    })
  }

  clicked.classList.contains('card-cvc') &&
    clicked.addEventListener('input', function () {
      limitInputLength(clicked, 3)
    })
})

btnSubmit.addEventListener('click', function (e) {
  e.preventDefault()
  if (checkEmptyInputs()) {
    mainEl.classList.add('hidden')
    completeEl.classList.remove('hidden')
    completeEl.classList.add('flex')
    filledCVC.textContent = cardCVC.value
    filledName.textContent = cardName.value
    filledNum.textContent = cardNum.value
    filledMM.textContent = cardMM.value
    filledYY.textContent = cardYY.value
    clearInputField()
  }
})

btnContinue.addEventListener('click', function (e) {
  mainEl.classList.remove('hidden')
  completeEl.classList.add('hidden')
  clearCompletedInput()
})
