// تحتاج الى بروكسي لي تجاوز المنع للوصول للصفحة
const proxyUrll = "هنا ضع الخادم بروكسي";
const targetUrll = "https://ncm.gov.sa/Ar/Weather/LocalWeatherInfo/Pages/Todayweather.aspx";

fetch(`${proxyUrll}?url=${encodeURIComponent(targetUrll)}`)
  .then((response) => response.text())
  .then((data) => {
    
    

    // تحليل المحتوى باستخدام DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    // البحث عن العنصر المطلوب
    const element = doc.querySelector(
      "#ctl00_ctl55_g_4fbd8f00_769b_429e_a116_63086f9a0183_ctl00_KingdomWeatherControl_lblWeatherStatusKingdom"
    );
    const alart = doc.querySelector(
      "#ctl00_ctl55_g_4fbd8f00_769b_429e_a116_63086f9a0183_ctl00_KingdomWeatherControl_lblWeatherDescKingdom"
    )
    const timedata = doc.querySelector(
      "#ctl00_ctl55_g_4fbd8f00_769b_429e_a116_63086f9a0183_ctl00_KingdomWeatherControl_lblWeatherDateKingdom"
    )
  document.getElementById("title-card").innerText = element.innerText;
  document.getElementById("alret").innerText = alart.innerText+"  اخر تحديث "+timedata.innerText;

  })
  .catch((error) => error);
