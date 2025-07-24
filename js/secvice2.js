function onSuccess() {
  hideelement(); // Assume hideelement() is defined elsewhere


  fetch("https://summer-voice-458b.azooz51894.workers.dev/get-api-keys", {
    method: "GET",
    headers: {
      Authorization: "Bearer 43259a04-d342-4398-a769-43d7739de7bb",
    },
  })
    .then((apiKeysResponse) => {
      if (!apiKeysResponse.ok) {
        throw new Error(`HTTP error! status: ${apiKeysResponse.status}`);
      }
      return apiKeysResponse.json();
    })
    .then((apiKeysData) => {
      const locationApiKey = apiKeysData.locationApiKey;
      const weatherApiKey = apiKeysData.weatherApiKey;

      // Get location from localStorage
      const savedLocation = localStorage.getItem("userLocation");
      if (!savedLocation) {
        throw new Error("User location not found in localStorage.");
      }
      const { latitude, longitude } = JSON.parse(savedLocation);

      // 2. Fetch Location Details (OpenCageData)
      return fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${locationApiKey}`
      )
        .then((locationResponse) => {
          if (!locationResponse.ok) {
            throw new Error(`HTTP error! status: ${locationResponse.status}`);
          }
          return locationResponse.json();
        })
        .then((locationData) => {
          const allDetails = locationData.results[0].components;

          const city =
            allDetails.city ||
            allDetails.state ||
            allDetails.province ||
            allDetails._normalized_city ||
            "";
          const suburb =
            allDetails.neighbourhood ||
            allDetails.suburb ||
            allDetails.quarter ||
            allDetails._normalized_suburb ||
            allDetails._normalized_neighbourhood ||
            allDetails.town ||
            allDetails._normalized_city ||
            allDetails.province ||
            "";
          document.getElementById(
            "loca-weather2"
          ).innerText = `${city} - ${suburb}`;

          // 3. Fetch Current Weather Details (OpenWeatherMap)
          const currentWeatherApiUrl =
            "https://api.openweathermap.org/data/2.5/weather";
          return fetch(
            `${currentWeatherApiUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
          )
            .then((currentWeatherResponse) => {
              if (!currentWeatherResponse.ok) {
                throw new Error(
                  `HTTP error! status: ${currentWeatherResponse.status}`
                );
              }
              return currentWeatherResponse.json();
            })
            .then((currentWeatherData) => {
              const { main, weather } = currentWeatherData;
              const { temp_max, temp_min } = main;
              const { description } = weather[0];
              const mainWeather = weather[0].main;

              document.getElementById("temp_max").innerText = `${Math.round(
                temp_max
              )}°C`;
              document.getElementById(
                "description"
              ).innerText = `${description}`;

              // Load Lottie animation for current weather
              lottie.loadAnimation({
                container: document.getElementById("Lottie2"),
                path: getWetherstate(mainWeather), // Assume getWetherstate() is defined elsewhere
                renderer: "svg",
                loop: true,
                autoplay: true,
              });

              // 4. Fetch 7-day Forecast (OpenWeatherMap Forecast API)
              const forecastApiUrl2 =
                "https://api.openweathermap.org/data/2.5/forecast?";
              return fetch(
                `${forecastApiUrl2}lat=${latitude}&lon=${longitude}&cnt=7&appid=${weatherApiKey}&units=metric`
              )
                .then((forecastResponse) => {
                  if (!forecastResponse.ok) {
                    throw new Error(
                      `HTTP error! status: ${forecastResponse.status}`
                    );
                  }
                  return forecastResponse.json();
                })
                .then((forecastData) => {
                  const dailyForecasts = {};
                  forecastData.list.map((item) => {
                    const date = item.dt_txt.split(" ")[0];
                    if (!dailyForecasts[date]) {
                      dailyForecasts[date] = [];
                    }
                    dailyForecasts[date].push(item || {});
                  });

                  const dayDiv = document.getElementById("transparent-card2");
                  dayDiv.style.display = "flex";
                  dayDiv.style.flexDirection = "column";
                  dayDiv.style.alignItems = "Center";
                  dayDiv.style.direction = "rtl";
                  dayDiv.style.borderRadius = "19px";
                  dayDiv.style.overflow = "auto";
                  dayDiv.style.scrollbarWidth = "none";
                  dayDiv.style.color = "rgb(0, 0, 0)";

                  for (const [date, forecasts] of Object.entries(
                    dailyForecasts
                  )) {
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
                      )}   `; // Assume getWetherstateday() is defined elsewhere

                      const tempSpan = document.createElement("span");
                      tempSpan.innerText = `${Math.round(temp)}°C`;

                      const timeSpan = document.createElement("span");
                      timeSpan.innerText = `${formattedTime}`;
                      timeSpan.style.fontSize = "12px";
                      timeSpan.style.color = "rgb(0, 0, 0)";

                      dayLabel.appendChild(descriptionSpan);
                      dayLabel.appendChild(tempSpan);
                      dayLabel.appendChild(timeSpan);
                    });
                  }

                  // 5. Fetch Daily Forecast (Open-Meteo)
                  return fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min`
                  )
                    .then((openMeteoResponse) => {
                      if (!openMeteoResponse.ok) {
                        throw new Error(
                          `HTTP error! status: ${openMeteoResponse.status}`
                        );
                      }
                      return openMeteoResponse.json();
                    })
                    .then((openMeteoData) => {
                      const { daily } = openMeteoData;
                      const {
                        temperature_2m_max,
                        temperature_2m_min,
                        weather_code,
                      } = daily;

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
                      dayDiv2.style.margin = "-10px";

                      for (const [date, details] of Object.entries(dailyday)) {
                        details.forEach((detail) => {
                          const allday1 = document.createElement("span");
                          allday1.innerText = `${getDate(date)}|\n${Math.round(
                            detail.maxTemp
                          )}° \n${Math.round(detail.minTemp)}°\n${getcodestate(
                            detail.code
                          )}`; // Assume getDate() and getcodestate() are defined elsewhere

                          dayDiv2.appendChild(allday1);
                        });
                      }

                      showelement(); // Assume showelement() is defined elsewhere
                    });
                });
            });
        });
    })
    .catch((error) => {
      console.error("Error in fetching weather data:", error);
      showErrorAnimation(); // Assume showErrorAnimation() is defined elsewhere
    });
}

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

  today.setHours(0, 0, 0, 0);
  givenDate.setHours(0, 0, 0, 0);

  if (givenDate.getTime() === today.getTime()) {
    return "اليوم";
  }

  let dayNumber = givenDate.getDay();
  let weekdays = ["احد", "اثنين", "ثلاثاء", "اربعاء", "خميس", "جمعة", "سبت"];

  let dayName = weekdays[dayNumber] + "";
  return dayName;
}

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
