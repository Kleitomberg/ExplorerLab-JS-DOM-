import './css/index.css'

//cores e bandeira e infos
const bgcolor1 = document.querySelector('.cc-bg svg > g g:nth-child(1) path ')
const bgcolor2 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
const flagcard = document.querySelector('.cc-logo span:nth-child(2) img')
const numbercard = document.querySelector('.cc-number')

//cc - holder > value
//cc - expiration > value

///cc - security > value
//dados do formulario
const cardNumber = document.querySelector('#card-number')
const titular = document.querySelector('#card-holder')
const validade = document.querySelector('#expiration-date')
const cvc = document.querySelector('#security-code')

function setCardinfo() {
  console.log('chamou')
  numbercard.innerHTML = cardNumber.val
}

function setCardType(type) {
  const cardscolors = {
    visa: ['#2D57F2', '2D57F2'],
    mastercard: ['#C69347', '#DF6F29'],
    default: ['black', 'gray'],
    elo: ['#EF4123', '#00A4E0'],
  }

  bgcolor1.setAttribute('fill', cardscolors[type][0])
  bgcolor2.setAttribute('fill', cardscolors[type][1])
  flagcard.setAttribute('src', `cc-${type}.svg`)
}

setCardType('elo')
globalThis.setCardType = setCardType
