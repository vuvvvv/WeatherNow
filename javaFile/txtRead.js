
fetch('./txt/text.txt').then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch the file');
    }
    return response.text();
  })
  .then(data => {
    document.getElementById('imagetime').innerHTML = data;
    console.log(data); // عرض النص
  })
  .catch(error => {
    console.error(error); // معالجة الأخطاء
  });


