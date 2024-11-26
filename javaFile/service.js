

// دالة لإظهار العناصر
function showelement () {
  div1 = document.querySelector('.Weather-muna')
  div2 = document.querySelector('.in-said-card')
  div1.style.visibility = 'visible'
  div2.style.visibility = 'visible'
}

// دالة لإخفاء العناصر
function hideelement () {
  div1 = document.querySelector('.Weather-muna')
  div2 = document.querySelector('.in-said-card')
  div1.style.visibility = 'hidden'
  div2.style.visibility = 'hidden'
}
//#####################################################################################################################

// جلب بيانات الموقع ^!^
async function showLocation () {
  if (navigator.geolocation != null) {
    hideelement()
    document
      .getElementById('insid-card')
      .insertAdjacentHTML(
        'beforebegin',
        '<div class="loader" id="loader"></div>'
      )
    navigator.geolocation.getCurrentPosition(onSuccess)
    
  } else {
    hideelement()
    const animations = await lottie.loadAnimation({
      container: document.getElementById('Lottie'),
      path: '/assets/error.json', // انمايشن حالة الطقس
      renderer: 'svg',
      loop: true,
      autoplay: true,


    })
    hideelement()
    removeLoader()
    document.getElementById('Lottie').style.visibility = 'visible'
    document.getElementById('Lottie').style.marginTop = '50px'
  }
}

// دالة تُنفذ عند نجاح جلب الموقع الجغرافي
async function onSuccess (position) {
  let locationApiKey = 'dcbe7133d6764acc9f01b44eec762204'
  let weatherApiKey = '331c32dd574914f3ea9605314510dac2'
  

  let { latitude, longitude } = position.coords
 
  try {
    
    let response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${locationApiKey}`
    )

    let data = await response.json()
    let allDetails = data.results[0].components
    console.table(allDetails)

    let { city, suburb } = allDetails
    document.getElementById('loca-weather').innerText = `${city} - ${suburb}`
    
    if (city != undefined ) {
      showelement()
      removeLoader()
    } else {(city == undefined)
      hideelement().style.visibility = 'hidden'
      const animations = await lottie.loadAnimation({
        container: document.getElementById('Lottie'),
        path: '/assets/error.json', // انمايشن حالة الطقس
        renderer: 'svg',
        loop: true,
        autoplay: true
      })
      hideelement()
      removeLoader()
      document.getElementById('Lottie').style.visibility = 'visible'
      document.getElementById('Lottie').style.marginTop = '50px'
    }

    let apiUrl = 'http://api.openweathermap.org/data/2.5/weather'
    let responsee = await fetch(
      `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
    )

    let dataa = await responsee.json()
    let { main, weather, wind, clouds } = dataa
    let { temp, humidity } = main
    let { description } = weather[0]
    let { speed } = wind
    let { all } = clouds
    let main1 = dataa.weather[0].main

    document.getElementById('state').innerText = `${main1}`

    document.getElementById('temp').innerText = `${~~temp}°C`
    document.getElementById('hum').innerText = `${~~humidity}%`
    document.getElementById('wind1').innerText = `${~~speed}m/s`
    document.getElementById('rain1').innerText = `${~~all}%`

    try {
      const animations = await lottie.loadAnimation({
        container: document.getElementById('Lottie'),
        path: getWetherstate(main1), // انمايشن حالة الطقس
        renderer: 'svg',
        loop: true,
        autoplay: true
      })
    } catch (error) {
      
      const animations = await lottie.loadAnimation({
        container: document.getElementById('Lottie'),
        path: '/assets/error.json', // انمايشن حالة الطقس
        renderer: 'svg',
        loop: true,
        autoplay: true
      })
      hideelement()
      removeLoader()
      document.getElementById('Lottie').style.visibility = 'visible'
      document.getElementById('Lottie').style.marginTop = '50px'
    }
  } catch (error) {
    const animations = await lottie.loadAnimation({
      container: document.getElementById('Lottie'),
      path: '/assets/error.json', // انمايشن حالة الطقس
      renderer: 'svg',
      loop: true,
      autoplay: true
    })
    hideelement()
    removeLoader()
    document.getElementById('Lottie').style.visibility = 'visible'
    document.getElementById('Lottie').style.marginTop = '50px'
  }
}

// دالة لإخفاء مؤشر التحميل في حالة حدوث خطأ ^!^
function removeLoader () {
  let loader = document.querySelector('.loader')
  if (loader) {
    loader.remove()
  }
}

showLocation()
onSuccess()




// دالة لتحديد حالة الطقس وعرض الأنميشن المناسب
function getWetherstate (weatherstate) {
  if (weatherstate == null) return '/assets/sun.json'
  switch (weatherstate.toLowerCase()) {
    case 'clouds':
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
      return '/assets/cluod.json' // عشان نعرف هل الطقس غائم
    case 'rain':
    case 'drizzle':
    case 'shower rain':
    case 'thunderstorm':
      return '/assets/rain.json' // ماطر

    case 'clear': // اذا كان نهار اذا شمس
      switch (hoursNew() == 'LIGHT MODE') {
        case true:
          return '/assets/sun.json'
        case false:
          return '/assets/ngit.json'
      }

    case 'clear': // اذا كان مساء اذا قمر
      switch (hoursNew() == 'NIGHT MODE') {
        case true:
          return '/assets/ngit.json'
        case false:
          return '/assets/sun.json'
      }

    default:
      return ''
  }
}

