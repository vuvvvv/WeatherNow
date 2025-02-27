// جلب بيانات الموقع ^!^
function showLocation() {
  if (navigator.geolocation) {
    hideelement();

    document
      .getElementById("insid-card")
      .insertAdjacentHTML(
        "beforebegin",
        '<div class="loader" id="loader"></div>'
      );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          // تخزين الموقع في Local Storage
          localStorage.setItem("userLocation", JSON.stringify(coords));
        },
        (error) => {
          
        }
      );
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    showErrorAnimation();
  }
}

// دالة الخطأ عند فشل جلب الموقع
function onError(error) {
  error.message;
  showErrorAnimation();
  removeLoader();
}

function onSuccess(position) {
  if (!position || !position.coords) {
    removeLoader();
    return;
  }

  

      let locationApiKey = "هنا تضع مفتاح"; // www.opencagedata.com - API للحصول على موقعك بدقه
      let weatherApiKey = "هنا تضع مفتاح"; // www.openweathermap.org - API للحصول على معلومات الطقس
      let { latitude, longitude } = position.coords;

      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${locationApiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          let allDetails = data.results[0].components;

          let { city, suburb } = allDetails;
          document.getElementById(
            "loca-weather"
          ).innerText = `${city} - ${suburb}`;

          if (city != undefined) {
            showelement();
            removeLoader();
          } else {
            showErrorAnimation();
          }

          let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
          return fetch(
            `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
          );
        })
        .then((responsee) => responsee.json())
        .then((dataa) => {
          let { main, wind, clouds } = dataa;
          let { temp, humidity } = main;
          let { speed } = wind;
          let { all } = clouds;
          let main1 = dataa.weather[0].main;

          document.getElementById("state").innerText = `${geTtrinslate(main1)}`;
          document.getElementById("temp").innerText = `${~~temp}°`;
          document.getElementById("hum").innerText = `${~~humidity} %`;
          document.getElementById("wind1").innerText = `${~~speed * 4} km/h`;
          document.getElementById("rain1").innerText = `${~~all} %`;

          // تحميل انميشن حالة الطقس
          return lottie.loadAnimation({
            container: document.getElementById("Lottie"),
            path: getWetherstate(main1),
            renderer: "svg",
            loop: true,
            autoplay: true,
          });
        })
        .catch((error) => {
          
          showErrorAnimation();
         
        });
    
}

onSuccess();
showLocation();

// دالة لإخفاء مؤشر التحميل في حالة حدوث خطأ ^!^
function removeLoader() {
  let loader = document.querySelector(".loader");
  if (loader) {
    loader.remove();
  }
}

// دالة لإظهار العناصر
function showelement() {
  const div1 = document.querySelector(".Weather-muna");
  const div2 = document.querySelector(".in-said-card");
  const div3 = document.querySelector(".loca-weather");
  div3.style.visibility = "visible";
  div1.style.visibility = "visible";
  div2.style.visibility = "visible";
}

// دالة لإخفاء العناصر
function hideelement() {
  const div1 = document.querySelector(".Weather-muna");
  const div2 = document.querySelector(".in-said-card");
  const div3 = document.querySelector(".loca-weather");
  div3.style.visibility = "hidden";
  div1.style.visibility = "hidden";
  div2.style.visibility = "hidden";
}

// عرض انميشن الخطاء
function showErrorAnimation() {
  hideelement();
  lottie.loadAnimation({
    container: document.getElementById("Lottie"),
    path: "/assets/error.json",
    renderer: "svg",
    loop: true,
    autoplay: true,
  });
  hideelement();
  removeLoader();
  document.getElementById("Lottie").style.visibility = "visible";
  document.getElementById("Lottie").style.marginTop = "50px";
}


function geTtrinslate(mains) {
  const weatherStates = {
    "Clouds": "غائم",
    "Tornado": "إعصار",
    "Rain": "ماطر",
    "Squall": "عاصفة مفاجئة",
    "Ash": "رماد",
    "Sand": "رمل",
    "Mist": "ضباب خفيف",
    "Smoke": "دخان",
    "Haze": "ضباب خفيف",
    "Snow": "ثلج",
    "Fog": " ضباب كثيف",
    "Sand": "رمل",
    "Drizzle": "رذاذ",
    "Moderate rain": "مطر معتدل",
    "Heavy intensity rain":"مطر غزير",
    "Very heavy rain":"مطر غزير جدًا",
    "Extreme rain":"مطر شديد جدًا",
    "Freezing rain":"مطر مجمد",
    "Light intensity shower rain":"زخات مطر خفيفة",
    "Shower rain":"زخات مطر",
    "Heavy intensity shower rain":"زخات مطر غزيرة",
    "Ragged shower rain":"زخات مطر خفيفة",
    "Light intensity drizzle":"رذاذ خفيف",
    "Heavy intensity drizzle":"رذاذ غزير",
    "Light intensity drizzle rain":"مطر رذاذ خفيف",
    "Drizzle rain":"مطر رذاذ",
    "Heavy intensity drizzle rain":"مطر رذاذ غزير",
    "Shower rain and drizzle":"زخات مطر ورذاذ",
    "Heavy shower rain and drizzle":"زخات مطر ورذاذ غزيرة",
    "Shower drizzle":"زخات رذاذ",
    "Thunderstorm":"عاصفة رعدية",
    "Thunderstorm with light rain":"عاصفة رعدية مع مطر خفيف",
    "Thunderstorm with rain":"عاصفة رعدية مع مطر",
    "Thunderstorm with heavy rain":"عاصفة رعدية مع مطر غزير",
    "Light thunderstorm":"عاصفة رعدية خفيفة",
    "Heavy thunderstorm":"عاصفة رعدية غزيرة",
    "Ragged thunderstorm":"عاصفة رعدية خفيفة",
    "Thunderstorm with light drizzle":"عاصفة رعدية مع رذاذ خفيف",
    "Thunderstorm with drizzle":"عاصفة رعدية مع رذاذ",
    "Thunderstorm with heavy drizzle":"عاصفة رعدية مع رذاذ غزير",
    "clear sky": "سماء صافية",
    "few clouds":"سحب قليلة",     
    "scattered clouds":"سحب متزايد",
    "broken clouds":"سحب متقطعة",
    "shower rain":"زخات مطر",
    "rain":"مطر",
    "thunderstorm":"عاصفة رعدية",
    "snow":"ثلج",
    "mist":"ضباب",

  };
  return weatherStates[mains] || "صافية";
}