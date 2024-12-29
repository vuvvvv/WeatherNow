import puppeteer from "puppeteer";
import fs from "fs";
const url = "https://www.yanbuweather.com/pages/ecmwf_original/";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  // تحديد عنصر الصورة (أول صورة في الصفحة)
  const imageSelector = "img"; // غيّر الـ selector إذا كنت تريد صورة محددة
  const textSelector = "#table_element_1";
  const imageElement = await page.$(imageSelector);
  const textElement = await page.$eval(textSelector, element => element.innerText);
 

  if (imageElement) {
    // التقاط لقطة شاشة للصورة فقط
    const boundingBox = await imageElement.boundingBox();

    if (boundingBox) {
      await page.screenshot({
        path: "../assets/screenshot.png",
        clip: {
          x: boundingBox.x,
          y: boundingBox.y,
          width: boundingBox.width,
          height: boundingBox.height,
        },
      });
     
      console.log("تم حفظ الصورة في: screenshot.png");
    } else {
      console.log("تعذر الحصول على أبعاد الصورة.");
    }
  } else {
    console.log("لم يتم العثور على عنصر الصورة.");
  }

  const textTime = fs.readFileSync("../txt/text.txt", "utf8");
  console.log(textTime);
  text(textTime).$("imagetime");
  await browser.close();



};



main();




