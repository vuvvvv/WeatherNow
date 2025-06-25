
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

      let locationApiKey = "dcbe7133d6764acc9f01b44eec762204";
      let weatherApiKey = "331c32dd574914f3ea9605314510dac2";
      
   
      let { latitude, longitude } = position.coords;

      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${locationApiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          let allDetails = data.results[0].components;

          let { city, neighbourhood: suburb } = allDetails;
          document.getElementById(
            "loca-weather"
          ).innerText = `${city} - ${suburb}`;
          if (city != undefined && suburb != undefined) {
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

          document.getElementById("state").innerText = `${main1}`;
          document.getElementById("temp").innerText = `${~~temp}°`;
          document.getElementById("hum").innerText = `${~~humidity} %`;
          document.getElementById("wind1").innerText = `${~~speed * 4} km/h`;
          document.getElementById("rain1").innerText = `${~~all} %`;

          
          return lottie.loadAnimation({
            container: document.getElementById("Lottie"),
            path: getWetherstate(main1),
            renderer: "svg",
            loop: true,
            autoplay: true,
          });
        })
        .catch((error) => {
          error;
          showErrorAnimation();
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
