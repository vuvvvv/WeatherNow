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

          localStorage.setItem("userLocation", JSON.stringify(coords));
        },
        (error) => {
          showErrorAnimation();
        }
      );
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    showErrorAnimation();
  }
}

function onError(error) {
  error.message;

  showErrorAnimation();
}

function onSuccess(position) {
  if (!position || !position.coords) {
    removeLoader();
    return;
  }

  let { latitude, longitude } = position.coords;

  // First fetch
  fetch("https://summer-voice-458b.azooz51894.workers.dev/get-api-keys", {
    method: "GET",
    headers: {
      Authorization: "Bearer 43259a04-d342-4398-a769-43d7739de7bb",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const locationApiKey = data.locationApiKey;
      const weatherApiKey = data.weatherApiKey;

      // Second fetch 
      return fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${locationApiKey}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const allDetails = data.results[0].components;

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
            "loca-weather"
          ).innerText = `${city} - ${suburb}`;

          if (city && suburb) {
            // Assuming showelement() and removeLoader() are defined elsewhere
            showelement();
            removeLoader();
          } else {
            // Assuming lottie.destroy() and showErrorAnimation() are defined elsewhere
            lottie.destroy();
            showErrorAnimation();
          }

          // Third fetch (nested): Get weather details using the obtained weatherApiKey
          const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
          return fetch(
            `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
          );
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const { main, wind, clouds, weather } = data;
          const { temp, humidity } = main;
          const { speed } = wind;
          const { all } = clouds;
          const mainWeather = weather[0].main;

          document.getElementById("state").innerText = `${mainWeather}`;
          document.getElementById("temp").innerText = `${Math.round(temp)}°`;
          document.getElementById("hum").innerText = `${Math.round(
            humidity
          )} %`;
          document.getElementById("wind1").innerText = `${Math.round(
            speed * 4
          )} km/h`;
          document.getElementById("rain1").innerText = `${Math.round(all)} %`;

          // Assuming lottie.loadAnimation and getWetherstate are defined elsewhere
          return lottie.loadAnimation({
            container: document.getElementById("Lottie"),
            path: getWetherstate(mainWeather),
            renderer: "svg",
            loop: true,
            autoplay: true,
          });
        });
    })
    .catch((error) => {
      console.error("Error in fetching data:", error);
      showErrorAnimation();
      removeLoader(); // Ensure loader is removed even on error
    });
}

onSuccess();
showLocation();

function removeLoader() {
  let loader = document.querySelector(".loader");
  if (loader) {
    loader.remove();
  }
}

function showelement() {
  const div1 = document.querySelector(".Weather-muna");
  const div2 = document.querySelector(".in-said-card");
  const div3 = document.querySelector(".loca-weather");
  div3.style.visibility = "visible";
  div1.style.visibility = "visible";
  div2.style.visibility = "visible";
}

function hideelement() {
  const div1 = document.querySelector(".Weather-muna");
  const div2 = document.querySelector(".in-said-card");
  const div3 = document.querySelector(".loca-weather");
  div3.style.visibility = "hidden";
  div1.style.visibility = "hidden";
  div2.style.visibility = "hidden";
}

function showErrorAnimation() {
  showelement();
  lottie.loadAnimation({
    container: document.getElementById("Lottie"),
    path: "./assets/error.json",
    renderer: "svg",
    loop: true,
    autoplay: true,
  });
  hideelement();
  removeLoader();
  document.getElementById("Lottie").style.visibility = "visible";
  document.getElementById("Lottie").style.marginTop = "50px";
}
