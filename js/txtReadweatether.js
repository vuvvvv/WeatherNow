const proxyUrll = "https://billowing-sun-c1b7.azooz51894.workers.dev/";
const targetUrll = "https://ncm.gov.sa/Ar/Weather/LocalWeatherInfo/Pages/Todayweather.aspx";

fetch(`${proxyUrll}?url=${encodeURIComponent(targetUrll)}`)
  .then((response) => response.text())
  .then((data) => {
    
    

    
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

   
    const element = doc.querySelector(
      "#ctl00_ctl57_g_4fbd8f00_769b_429e_a116_63086f9a0183_ctl00_KingdomWeatherControl_lblWeatherStatusKingdom"
      
    );
    const alart = doc.querySelector(
      "#ctl00_ctl57_g_4fbd8f00_769b_429e_a116_63086f9a0183_ctl00_KingdomWeatherControl_lblWeatherDescKingdom"
    )
    const timedata = doc.querySelector(
      "#ctl00_ctl57_g_4fbd8f00_769b_429e_a116_63086f9a0183_ctl00_KingdomWeatherControl_lblWeatherDateKingdom"
    )
  document.getElementById("title-card").innerText = element.innerText;
  document.getElementById("alret").innerText = alart.innerText+"  اخر تحديث "+timedata.innerText;
  console.log(element.innerText);


  })
  .catch((error) => error);
