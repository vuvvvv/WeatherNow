const proxyUrl = "https://billowing-sun-c1b7.azooz51894.workers.dev/";
const targetUrl = "https://www.almisnid.com/almisnid/days.php";

fetch(`${proxyUrl}?url=${encodeURIComponent(targetUrl)}`)
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    // التأكد من أن العنصر موجود قبل الوصول إليه
    const element = doc.querySelector("#flinew > div:nth-child(1) > table");
    
    if (element) {
      let text = element.innerText;

      // تنظيف النص
      let text1 = text.replace(/جوّال كون - www.almisnid.com\n/, '');
      let text2 = text1.replace(/عدّاد الفصول الرقمي\n/, '');
      let text3 = text2.replace(/\n\s*\n/g, '\n');

      // تحديث النص في العنصر الذي لديه id = "caonter"
      document.getElementById("caonter").innerText = text3;
    } else {
      console.error("لم يتم العثور على العنصر المحدد.");
    }
  })
  .catch((error) => console.log("خطأ في الطلب:", error));
