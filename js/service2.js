// دالة لإظهار العناصر
function showelement() {
  const div2 = document.querySelector(".transparent-card");
  const div4 = document.querySelector(".transparent-card2");
  const div5 = document.querySelector(".transparent-card3");
  const div6 = document.querySelector(".transparent-card4");
  const div7 = document.querySelector(".transparent-card5");
  const div3 = document.querySelector(".nav-top");

  div2.style.visibility = "visible";
  div3.style.visibility = "visible";
  div4.style.visibility = "visible";
  div5.style.visibility = "visible";
  div6.style.visibility = "visible";
  div7.style.visibility = "visible";
}

// دالة لإخفاء العناصر
function hideelement() {
  const div2 = document.querySelector(".transparent-card");
  const div4 = document.querySelector(".transparent-card2");
  const div5 = document.querySelector(".transparent-card3");
  const div6 = document.querySelector(".transparent-card4");
  const div7 = document.querySelector(".transparent-card5");
  const div3 = document.querySelector(".nav-top");
  div2.style.visibility = "hidden";
  div3.style.visibility = "hidden";
  div4.style.visibility = "hidden";
  div5.style.visibility = "hidden";
  div6.style.visibility = "hidden";
  div7.style.visibility = "hidden";
}
//#####################################################################################################################

// دالة تُنفذ عند نجاح جلب الموقع الجغرافي
function onSuccess() {
  hideelement();

  let locationApiKey = "هنا تضع مفتاح"; // www.opencagedata.com - API للحصول على موقعك بدقه
  let weatherApiKey = "هنا تضع مفتاح"; // www.openweathermap.org - API للحصول على معلومات الطقس

  const savedLocation = localStorage.getItem("userLocation");
  let { latitude, longitude } = JSON.parse(savedLocation);

  // استدعاء API للحصول على الموقع
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${locationApiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      let allDetails = data.results[0].components;

      let { city, suburb } = allDetails;
      document.getElementById(
        "loca-weather2"
      ).innerText = `${city} - ${suburb}`;

      let apiUrl = "https://api.openweathermap.org/data/2.5/weather";

      return fetch(
        `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
      );
    })

    .then((responsee) => responsee.json())
    .then((dataa) => {
      let { main, weather } = dataa;
      let { temp_max, temp_min } = main;
      let { description } = weather[0];

      let main1 = dataa.weather[0].main;

      document.getElementById("temp_max").innerText = `${~~temp_max}°C`;
      document.getElementById("description").innerText = `${geTtrinslate(
        description
      )}`;

      let apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast?";
      lottie.loadAnimation({
        container: document.getElementById("Lottie2"),
        path: getWetherstate(main1),
        renderer: "svg",
        loop: true,
        autoplay: true,
      });

      fetch(
        `${apiUrl2}lat=${latitude}&lon=${longitude}&cnt=7&appid=${weatherApiKey}&units=metric`
      )
        .then((responseee) => responseee.json())
        .then((dataaa) => {
          let { city } = dataaa;
          let { name } = city;

          fetch(
            // هذا موقع مفتوح المصدر للطقس قد تحتاج الى رابط جديد هو لا يحتاج الى مفتاح API
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min`
          )
            .then((response) => response.json())
            .then((data) => {
              const { daily } = data;
              const { temperature_2m_max, temperature_2m_min, weather_code } =
                daily;

              const dailyday = {};

              daily.time.forEach((time, index) => {
                const maxTemp = temperature_2m_max[index];
                const minTemp = temperature_2m_min[index];
                const code = weather_code[index];

                if (!dailyday[time]) {
                  dailyday[time] = [];
                }
                dailyday[time].push({ maxTemp, minTemp, code });
              });

              const dayDiv2 = document.getElementById("card-body4");
              dayDiv2.style.display = "flex";
              dayDiv2.style.flexDirection = "row";
              dayDiv2.style.alignItems = "Center";
              dayDiv2.style.direction = "rtl";
              dayDiv2.style.fontSize = "21px";
              dayDiv2.style.fontWeight = "bold";
              dayDiv2.style.fontFamily = "Scheherazade, serif";
              dayDiv2.style.overflow = "scroll";
              dayDiv2.style.scrollbarWidth = "none";
              dayDiv2.style.color = "rgb(0, 0, 0)";
              dayDiv2.style.justifyContent = "center";
              dayDiv2.style.margin = "6px";

              for (const [date, details] of Object.entries(dailyday)) {
                details.forEach((detail) => {
                  const allday1 = document.createElement("span");
                  allday1.innerText = `${getDate(
                    date
                  )}|\n${~~detail.maxTemp}° \n${~~detail.minTemp}°\n${getcodestate(
                    detail.code
                  )}`;

                  dayDiv2.appendChild(allday1);
                });
              }
            })
            .catch((error) => showErrorAnimation());

          const dailyForecasts = {};

          // تقسيم البيانات إلى أيام
          dataaa.list.map((item) => {
            const date = item.dt_txt.split(" ")[0];
            if (!dailyForecasts[date]) {
              dailyForecasts[date] = [];
            }
            dailyForecasts[date].push(item || {});
          });

          for (const [date, forecasts] of Object.entries(dailyForecasts)) {
            const dayDiv = document.getElementById("transparent-card2");
            dayDiv.style.display = "flex";
            dayDiv.style.flexDirection = "column";
            dayDiv.style.alignItems = "Center";
            dayDiv.style.direction = "rtl";
            dayDiv.style.borderRadius = "19px";
            dayDiv.style.overflow = "auto";
            dayDiv.style.scrollbarWidth = "none";
            dayDiv.style.color = "rgb(0, 0, 0)";

            forecasts.forEach((forecast) => {
              const time = forecast.dt_txt.split(" ")[1];
              const temp = forecast.main.temp;
              const hh = time.split(":")[0];
              const description = forecast.weather[0].description;
              const period = hh < 12 ? "ص" : "م";
              const formattedTime = `${hh} ${period}`;

              const dayLabel = document.createElement("p");
              dayDiv.appendChild(dayLabel);
              dayLabel.style.margin = "5px 0";
              dayLabel.style.color = "rgb(0, 0, 0)";
              dayLabel.style.fontSize = "29px";
              dayLabel.style.fontFamily = "Scheherazade, serif";
              dayLabel.style.fontWeight = "bold";
              dayLabel.style.direction = "ltr";

              const descriptionSpan = document.createElement("span");
              descriptionSpan.innerText = ` ${getWetherstateday(
                description
              )}   `;

              const tempSpan = document.createElement("span");
              tempSpan.innerText = `${~~temp}°C`;

              const timeSpan = document.createElement("span");
              timeSpan.innerText = `${formattedTime}`;
              timeSpan.style.fontSize = "12px";
              timeSpan.style.color = "rgb(0, 0, 0)";

              dayLabel.appendChild(descriptionSpan);
              dayLabel.appendChild(tempSpan);
              dayLabel.appendChild(timeSpan);
            });
          }

          showelement();
        })
        .catch((error) => {
          showErrorAnimation();
        });
      // تحميل انميشن حالة الطقس
    })

    .catch((error) => {
      showErrorAnimation();
    });
}

// دالة لإخفاء مؤشر التحميل في حالة حدوث خطأ ^!^

onSuccess();

function showErrorAnimation() {
  hideelement();
  lottie.loadAnimation({
    container: document.getElementById("Lottie3"),
    path: "/assets/error.json",
    renderer: "svg",
    loop: true,
    autoplay: true,
  });
}

function getWetherstateday(description) {
  const weatherStates = {
    "clear sky": "☀️",
    "شمس خافتة": "☀️",
    "ضوء الشمس": "☀️",
    "ضوءالشمس خافت": "☀️",
    "صافٍ غالبًا": "☀️",
    "شمس مشرقة": "☀️",
    "شمس مشرقة ساطعة": "☀️",
    شمس: "☀️",
    مشمس: "☀️",
    صافي: "☀️",
    "شمس مشرقة ساطعة": "☀️",
    "شمس مشرقة مصحوبة ببعض الغيوم": "🌤️",
    "few clouds": "🌤️",
    "مشمس في الغالب": "🌤️",
    "سحب وشمس": "🌤️",
    "مشمس جزئيًا": "🌤️",
    "مشمس غالبًا": "🌤️",
    "السحب المتقطعة": "🌤️",
    "تحجب الغيوم بعض الشمس": "🌤️",
    "مشمس إلى غائم جزئيًا": "🌤️",
    "scattered clouds": "🌥️",
    "غائم في الغالب": "🌥️",
    "غائم جزئيًا": "🌥️",
    غائم: "☁️",
    "broken clouds": "☁️",
    "كئيب (ملبد بالغيوم)": "☁️",
    "سحب متزايد": "☁️",
    "shower rain": "🌧️",
    "بضع زخات مطر": "🌧️",
    "مطر ورذاذ عرضي": "🌧️",
    الاستحمام: "🌧️",
    "فرصة لسقوط أمطار": "🌧️",
    "زخات مطر وجيزة": "🌧️",
    "غائم في الغالب مع زخات": "🌧️",
    rain: "🌧️",
    "مشمس في الغالب مع زخات": "🌧️",
    مطر: "🌧️",
    أمطار: "🌧️",
    "قليل من المطر": "🌧️",
    "فترات من المطر": "🌧️",
    thunderstorm: "⛈️",
    "تي - العواصف": "⛈️",
    حار: "🌡️",
    haze: "🌡️",
    hot: "🌡️",
    برد: "❄️",
    cold: "❄️",
    snow: "❄️",
    mist: "🌫️",
    "light rain": "🌦️",
    Clear: "☀️",
    "Light cloud": "🌤️",
    Clouds: "☁️",
    "overcast clouds": "☁️",
    "light intensity shower rain": "🌧️",
    "shower rain": "🌧️",
    "heavy intensity shower rain": "🌧️",
    "ragged shower rain": "🌧️",
  };
  return weatherStates[description] || "🌡️";
}

function geTtrinslate(mains) {
  const weatherStates = {
    Clouds: "غائم",
    Tornado: "إعصار",
    Rain: "ماطر",
    Squall: "عاصفة مفاجئة",
    Ash: "رماد",
    Sand: "رمل",
    Mist: "ضباب خفيف",
    Smoke: "دخان",
    Haze: "ضباب خفيف",
    Snow: "ثلج",
    Fog: " ضباب كثيف",
    Sand: "رمل",
    Drizzle: "رذاذ",
    "Moderate rain": "مطر معتدل",
    "Heavy intensity rain": "مطر غزير",
    "Very heavy rain": "مطر غزير جدًا",
    "Extreme rain": "مطر شديد جدًا",
    "Freezing rain": "مطر مجمد",
    "Light intensity shower rain": "زخات مطر خفيفة",
    "Shower rain": "زخات مطر",
    "Heavy intensity shower rain": "زخات مطر غزيرة",
    "Ragged shower rain": "زخات مطر خفيفة",
    "Light intensity drizzle": "رذاذ خفيف",
    "Heavy intensity drizzle": "رذاذ غزير",
    "Light intensity drizzle rain": "مطر رذاذ خفيف",
    "Drizzle rain": "مطر رذاذ",
    "Heavy intensity drizzle rain": "مطر رذاذ غزير",
    "Shower rain and drizzle": "زخات مطر ورذاذ",
    "Heavy shower rain and drizzle": "زخات مطر ورذاذ غزيرة",
    "Shower drizzle": "زخات رذاذ",
    Thunderstorm: "عاصفة رعدية",
    "Thunderstorm with light rain": "عاصفة رعدية مع مطر خفيف",
    "Thunderstorm with rain": "عاصفة رعدية مع مطر",
    "Thunderstorm with heavy rain": "عاصفة رعدية مع مطر غزير",
    "Light thunderstorm": "عاصفة رعدية خفيفة",
    "Heavy thunderstorm": "عاصفة رعدية غزيرة",
    "Ragged thunderstorm": "عاصفة رعدية خفيفة",
    "Thunderstorm with light drizzle": "عاصفة رعدية مع رذاذ خفيف",
    "Thunderstorm with drizzle": "عاصفة رعدية مع رذاذ",
    "Thunderstorm with heavy drizzle": "عاصفة رعدية مع رذاذ غزير",
    "clear sky": "سماء صافية",
    "few clouds": "سحب قليلة",
    "scattered clouds": "سحب متزايد",
    "broken clouds": "سحب متقطعة",
    "shower rain": "زخات مطر",
    rain: "مطر",
    thunderstorm: "عاصفة رعدية",
    snow: "ثلج",
    mist: "ضباب",
  };
  return weatherStates[mains] || "صافية";
}
function getcodestate(code) {
  const codeStates = {
    0: "☀️",
    1: "🌤️",
    2: "🌥️",
    3: "☁️",
    48: "🌫️",
    45: "🌫️",
    55: "🌦️",
    53: "🌦️",
    51: "🌦️",
    57: "🌦️",
    56: "🌦️",
    61: "🌧️",
    65: "🌧️",
    63: "🌧️",
    67: "⛈️",
    66: "⛈️",
    75: "❄️",
    73: "❄️",
    71: "❄️",
    77: "❄️",
    82: "🌧️",
    81: "🌧️",
    80: "🌧️",
    86: "❄️",
    85: "❄️",
    95: "⛈️",
    96: "⛈️",
    99: "⛈️",
  };
  return codeStates[code] || "🌡️";
}

function getDate(dateString) {
  let givenDate = new Date(dateString);
  let today = new Date();

  // إزالة الوقت من التاريخ للتأكد من المقارنة تعتمد على التاريخ فقط
  today.setHours(0, 0, 0, 0);
  givenDate.setHours(0, 0, 0, 0);

  if (givenDate.getTime() === today.getTime()) {
    return "اليوم";
  }

  let dayNumber = givenDate.getDay();
  let weekdays = ["احد", "اثنين", "ثلاثاء", "اربعاء", "خميس", "جمعة", "سبت"];

  // إضافة مسافة بعد كل يوم عند الإرجاع
  let dayName = weekdays[dayNumber] + "";
  return dayName;
}
