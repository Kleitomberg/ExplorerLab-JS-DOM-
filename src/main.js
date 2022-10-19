import './css/index.css'
import IMask from 'imask'

//cores e bandeira e infos do card
const svg = document.querySelector('#app > section > div.cc-bg > svg')
const bgcolor1 = document.querySelector('.cc-bg svg > g g:nth-child(1) path ')
const bgcolor2 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
const flagcard = document.querySelector('.cc-logo span:nth-child(2) img')
const numbercard = document.querySelector('.cc-number')
const titularcard = document.querySelector('.cc-holder .value')
const expirationCard = document.querySelector('.cc-expiration .value')
const securityval = document.querySelector('.cc-security .value')

//inputs
const cardNumber = document.querySelector('#card-number')
const titular = document.querySelector('#card-holder')
const validade = document.querySelector('#expiration-date')
const cvc = document.querySelector('#security-code')

// ----  MASKs ------

//CVC MASK
const cvcmaskOption = {
  mask: '0000',
}
const cvcmasked = IMask(cvc, cvcmaskOption)

//EXPIRATION MASK
const validademaskOption = {
  mask: 'MM{/}YY',
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}
const validademasked = IMask(validade, validademaskOption)

//NUMBER MASK

const numbermaskoptions = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardtype: 'visa',
    },

    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: 'mastercard',
    },

    {
      mask: '0000 0000 0000 0000',
      regex: /^6\d{0,15}/,
      cardtype: 'elo',
    },
    {
      mask: '0000 0000 0000 0000',
      cardtype: 'default',
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '')

    const foundmask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    setCardType(foundmask.cardtype)
    if (foundmask.cardtype == 'elo') {
      svg.style.border = '2px solid #FFCB05'
      svg.style.borderRadius = '14px'
    } else if (foundmask.cardtype == 'mastercard') {
      svg.style.border = '2px solid #FF7D05'
      svg.style.borderRadius = '14px'
    } else if (foundmask.cardtype == 'visa') {
      svg.style.border = '2px solid #00A4E0'
      svg.style.borderRadius = '14px'
    } else if (foundmask.cardtype == 'default') {
      svg.style.border = 'none'
      svg.style.borderRadius = '14px'
    }

    return foundmask
  },
}
const numbergmasked = IMask(cardNumber, numbermaskoptions)

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
