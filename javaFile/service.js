
// دالة لإظهار العناصر
function showelement () {
  const div1 = document.querySelector('.Weather-muna')
  const div2 = document.querySelector('.in-said-card')
  div1.style.visibility = 'visible'
  div2.style.visibility = 'visible'
}

// دالة لإخفاء العناصر
function hideelement () {
  const div1 = document.querySelector('.Weather-muna')
  const div2 = document.querySelector('.in-said-card')
  div1.style.visibility = 'hidden'
  div2.style.visibility = 'hidden'
}
//#####################################################################################################################

// جلب بيانات الموقع ^!^
function showLocation() {
  if (navigator.geolocation) {
    hideelement();

    document
      .getElementById('insid-card')
      .insertAdjacentHTML(
        'beforebegin',
        '<div class="loader" id="loader"></div>'
      );

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
  
          // تخزين الموقع في Local Storage
          localStorage.setItem('userLocation', JSON.stringify(coords));
  
          console.log('Location saved:', coords);
        }, error => {
          console.error('Error fetching location:', error);
        });
      } else {
        console.log('Geolocation not supported by this browser.');
      }

    // استدعاء الموقع مع دالة نجاح ودالة خطأ
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    showErrorAnimation();
  }
}

// دالة الخطأ عند فشل جلب الموقع
function onError(error) {
  console.error("Error fetching location:", error.message);
  showErrorAnimation();
  removeLoader();
}


// دالة تُنفذ عند نجاح جلب الموقع الجغرافي
function onSuccess(position) {

  if (!position || !position.coords) {
    console.error("Invalid position object:", position);
    removeLoader();
    return;
  }
  
  const api_url = "https://api.jsonbin.io/v3/b/675c95ebad19ca34f8daadb3"
  const api = "$2a$10$gqd8bam5IOPCIuUcLNFdc.QphugZIMiBGlIEy22QZX6bSyooJy9Wa"
  let locationKey;
  let weatherKey;

// استدعاء المفتاح
fetch(api_url, {
  headers: {
    'X-Master-Key': api
  }
})
  .then(response => response.json())
  .then((data) => {
     locationKey = data.record.headers[0].locationKey; 
     weatherKey = data.record.headers[0].weatherKey;

  
    
 
  
  

  let locationApiKey = locationKey;
  let weatherApiKey = weatherKey;
  let { latitude, longitude } = position.coords;

  // استدعاء API للحصول على الموقع
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${locationApiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      let allDetails = data.results[0].components;

      let { city, suburb } = allDetails;
      document.getElementById('loca-weather').innerText = `${city} - ${suburb}`;
      

      if (city != undefined) {
        showelement();
        removeLoader();
      } else {
        hideelement().style.visibility = 'hidden';
        showErrorAnimation();
      }

      let apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
      return fetch(
        `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
      );
    })
    .then((responsee) => responsee.json())
    .then((dataa) => {
      let { main, weather, wind, clouds } = dataa;
      let { temp, humidity } = main;
      let { description } = weather[0];
      let { speed } = wind;
      let { all } = clouds;
      let main1 = dataa.weather[0].main;

      document.getElementById('state').innerText = `${main1}`;
      document.getElementById('temp').innerText = `${~~temp}°C`;
      document.getElementById('hum').innerText = `${~~humidity}%`;
      document.getElementById('wind1').innerText = `${~~speed}m/s`;
      document.getElementById('rain1').innerText = `${~~all}%`;

      // تحميل انميشن حالة الطقس
      return lottie.loadAnimation({
        container: document.getElementById('Lottie'),
        path: getWetherstate(main1),
        renderer: 'svg',
        loop: true,
        autoplay: true
      });
    })
    .catch((error) => {
      showErrorAnimation();
    });

  })
  .catch(error => {
    console.error('Error fetching the key:', error);
  });
}


// دالة لإخفاء مؤشر التحميل في حالة حدوث خطأ ^!^
function removeLoader () {
  let loader = document.querySelector('.loader')
  if (loader) {
    loader.remove()
  }
}

onSuccess()
showLocation()

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

function showErrorAnimation () {
  hideelement()
  lottie.loadAnimation({
    container: document.getElementById('Lottie'),
    path: '/assets/error.json',
    renderer: 'svg',
    loop: true,
    autoplay: true
  })
  hideelement()
  removeLoader()
  document.getElementById('Lottie').style.visibility = 'visible'
  document.getElementById('Lottie').style.marginTop = '50px'
}
