//هذي المثود تشيك على الوقت واذا كان من ضمن اللسته راح يغير لون الصفحه الى ليل
function hoursNew () {
  huors = new Date()

  switch (
    huors.getHours() < 10 ? '0' + huors.getHours() : huors.getHours().toString()
  ) {
    case '00':
    case '01':
    case '02':
    case '03':
    case '04':
    case '05':
    case '06':
    case '19':
    case '18':
    case '20':
    case '21':
    case '22':
    case '23':
      return 'NIGHT MODE'
    case '07':
    case '08':
    case '09':
    case '10':
    case '11':
    case '12':
    case '13':
    case '14':
    case '15':
    case '16':
    case '17':
      return 'LIGHT MODE'
  }
  return huors
}
function colorBody () {
  if (hoursNew() == 'NIGHT MODE') {
    document.body.style.background =
      'linear-gradient(180deg, rgba(1,22,48,1) 0%, rgba(0,53,98,1) 100%)'
    document.getElementById('cardInner').style.backdropFilter = 'blur(1px)'
    document.getElementById('mySidebar').style.backdropFilter = 'blur(100px)'
  } else {
    hoursNew() == 'LIGHT MODE'
    document.body.style.background =
      'linear-gradient(0deg, rgb(45, 91, 183) 0%, rgb(98, 165, 241) 100%)'
    document.getElementById('cardInner').style.backdropFilter = 'blur(10px)'
    document.getElementById('mySidebar').style.backdropFilter = 'none'
  }
}
colorBody()
//#####################################################################################################################
