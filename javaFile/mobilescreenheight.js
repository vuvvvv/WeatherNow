import { ENV_VARS } from './test.js';
// دعم اجهزة الجوال الطويلة
function screenHeight (v) {
  v
  switch (v) {
    case 532:
      return (document.querySelector('.openbtn').style.top = '25px')
    case 568:
      return (document.querySelector('.openbtn').style.top = '9px')
    case 667:
      return (document.querySelector('.openbtn').style.top = '-20px')
    case 640:
      return (document.querySelector('.openbtn').style.top = '-15px')
    case 760:
      return (document.querySelector('.openbtn').style.top = '-50px')
    case 820:
      return (document.querySelector('.openbtn').style.top = '-80px')
    case 900:
      return (document.querySelector('.openbtn').style.top = '-115px')
    case 915:
      return (document.querySelector('.openbtn').style.top = '-130px')
    case 800:
      return (document.querySelector('.openbtn').style.top = '-75px')
    case 896:
      return (document.querySelector('.openbtn').style.top = '-130px')
    case 844:
      return (document.querySelector('.openbtn').style.top = '-100px')
    case 926:
      return (document.querySelector('.openbtn').style.top = '-130px')
    case 846:
      return (document.querySelector('.openbtn').style.top = '-100px')
    case 0:
    default:
      return (document.querySelector('.openbtn').style.top = '')
  }
}
screenHeight(screen.height)


console.log(ENV_VARS.LO_K_SECRET);