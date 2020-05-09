const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const TARGET_URL = 'https://sv.bdu.edu.vn/Default.aspx?page=thoikhoabieu';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>BDU schedule API</h1>');
});

//convert a string to  an object
convertToObject = (string) => {
  const vals = string.split(',');
  return {
    class: vals[1],
    subjectName: vals[2],
    weekDay: vals[3],
    startSlot: vals[6],
    numbersOfSlots: vals[7],
    instructor: vals[8],
  };
};

// get schedule from html
getScheduleData = (body) => {
  const $ = cheerio.load(body);
  const id = $('#ctl00_ContentPlaceHolder1_ctl00_lblContentMaSV').text();
  const name = $('#ctl00_ContentPlaceHolder1_ctl00_lblContentTenSV').text();
  const detail = $('#ctl00_ContentPlaceHolder1_ctl00_lblContentLopSV').text();

  const schedule = $(
    '#ctl00_ContentPlaceHolder1_ctl00_Table1 tbody td'
  ).toArray();

  const data = schedule.reduce((acc, element) => {
    const el = $(element);
    let content = el.attr('onmouseover');
    if (content) {
      content = convertToObject(content);
      acc.push(content);
    }
    return acc;
  }, []);

  return { id, name, detail, schedule: data };
};

app.get('/api/schedule/:id', (req, res) => {
  const { id } = req.params;
  const endPoint = `${TARGET_URL}&id=${id}`;
  console.log(endPoint);

  request({ method: 'GET', uri: endPoint }, (error, _, body) => {
    if (error) {
      return res.status(500).json({ error: 'internal server error' });
    }
    const schedule = getScheduleData(body);
    res.send(schedule);
  });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
