const proxyUrl = "https://billowing-sun-c1b7.azooz51894.workers.dev/";
const targetUrl = "https://www.almisnid.com/almisnid/days.php";

fetch(`${proxyUrl}?url=${encodeURIComponent(targetUrl)}`)
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    
    const element = doc.querySelector("#flinew > div:nth-child(1) > table");
    
    if (element) {
      let text = element.innerText;

      
      let text1 = text.replace(/جوّال كون - www.almisnid.com\n/, '');
      let text2 = text1.replace(/عدّاد الفصول الرقمي\n/, '');
      let text3 = text2.replace(/\n\s*\n/g, '\n');

      
      document.getElementById("caonter").innerText = text3;
    } 
  })
  .catch((error) => error);
