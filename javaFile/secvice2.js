// دالة لإظهار العناصر
function showelement() {
  const div2 = document.querySelector(".in-said-card2");
  div1.style.visibility = "visible";
  div2.style.visibility = "visible";
}

// دالة لإخفاء العناصر
function hideelement() {
  const div2 = document.querySelector(".in-said-card2");
  div1.style.visibility = "hidden";
  div2.style.visibility = "hidden";
}
//#####################################################################################################################

// دالة تُنفذ عند نجاح جلب الموقع الجغرافي
function onSuccess() {
  const api_url2 = "https://api.jsonbin.io/v3/b/675c95ebad19ca34f8daadb3";
  const api2 = "$2a$10$gqd8bam5IOPCIuUcLNFdc.QphugZIMiBGlIEy22QZX6bSyooJy9Wa";
  let locationKey;
  let weatherKey;

  // استدعاء المفتاح
  fetch(api_url2, {
    headers: {
      "X-Master-Key": api2,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      locationKey = data.record.headers[0].locationKey;
      weatherKey = data.record.headers[0].weatherKey;

      let locationApiKey = locationKey;
      let weatherApiKey = weatherKey;

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

          let apiUrl = "http://api.openweathermap.org/data/2.5/weather";

          ("http://api.openweathermap.org/data/2.5/forecast/daily?");
          //lat=44.34&lon=10.99&cnt=7&appid={API key}

          return fetch(
            `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
          );
        })

        .then((responsee) => responsee.json())
        .then((dataa) => {
          let { main , weather } = dataa;
          let { temp_max, temp_min } = main;
          let { description } = weather[0];
          

          console.log(main);

          let main1 = dataa.weather[0].main;

          document.getElementById("temp_max").innerText = `${~~temp_max}°C`;
          document.getElementById("description").innerText = `${description}`;

          let apiUrl2 = "http://api.openweathermap.org/data/2.5/forecast/?";
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
              console.log(dataaa);
            })
            .catch((error) => {
              showErrorAnimation();
            });
          // تحميل انميشن حالة الطقس
        })

        .catch((error) => {
          showErrorAnimation();
        });
    })
    .catch((error) => {
      console.error("Error fetching the key:", error);
    });
}

// دالة لإخفاء مؤشر التحميل في حالة حدوث خطأ ^!^
function removeLoader() {
  let loader = document.querySelector(".loader2");
  if (loader) {
    loader.remove();
  }
}

onSuccess();
showLocation();



function showErrorAnimation() {
  hideelement();
  lottie.loadAnimation({
    container: document.getElementById("Lottie2"),
    path: "/assets/error.json",
    renderer: "svg",
    loop: true,
    autoplay: true,
  });
  hideelement();
  removeLoader();
  document.getElementById("Lottie2").style.visibility = "visible";
  document.getElementById("Lottie2").style.marginTop = "50px";
}
