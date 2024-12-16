
// دالة لإظهار العناصر
function showelement () {
    
    const div2 = document.querySelector('.in-said-card2')
    div1.style.visibility = 'visible'
    div2.style.visibility = 'visible'
  }
  
  // دالة لإخفاء العناصر
  function hideelement () {
    const div2 = document.querySelector('.in-said-card2')
    div1.style.visibility = 'hidden'
    div2.style.visibility = 'hidden'
  }
  //#####################################################################################################################
  
 

  
  
  // دالة تُنفذ عند نجاح جلب الموقع الجغرافي
  function onSuccess() {
   
   
    const api_url2 = "https://api.jsonbin.io/v3/b/675c95ebad19ca34f8daadb3"
    const api2 = "$2a$10$gqd8bam5IOPCIuUcLNFdc.QphugZIMiBGlIEy22QZX6bSyooJy9Wa"
    let locationKey;
    let weatherKey;
  
  // استدعاء المفتاح
  fetch(api_url2, {
    headers: {
      'X-Master-Key': api2
    }
  })
    .then(response => response.json())
    .then((data) => {
       locationKey = data.record.headers[0].locationKey; 
       weatherKey = data.record.headers[0].weatherKey;
  
  
    let locationApiKey = locationKey;
    let weatherApiKey = weatherKey;
    
    const savedLocation = localStorage.getItem('userLocation');
      let { latitude, longitude } = JSON.parse(savedLocation);
      
    // استدعاء API للحصول على الموقع
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${locationApiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        let allDetails = data.results[0].components;
  
        let { city, suburb } = allDetails;
        document.getElementById('loca-weather2').innerText = `${city} - ${suburb}`;
        console.table(allDetails);
  
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
  
        document.getElementById('temp2').innerText = `${~~temp}°C`;
      
  
        // تحميل انميشن حالة الطقس
        return lottie.loadAnimation({
          container: document.getElementById('Lottie2'),
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
    let loader = document.querySelector('.loader2')
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
      container: document.getElementById('Lottie2'),
      path: '/assets/error.json',
      renderer: 'svg',
      loop: true,
      autoplay: true
    })
    hideelement()
    removeLoader()
    document.getElementById('Lottie2').style.visibility = 'visible'
    document.getElementById('Lottie2').style.marginTop = '50px'
  }
  