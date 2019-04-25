var express = require('express')
var app = express();
var fs = require('fs')

app.use(express.json())

var signList = ['aries', 'tauras', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
var dateObj = new Date();
var month = dateObj.getUTCMonth();
const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

var todaysDate = monthName[month] + " " + day + ", " + year;
console.log(todaysDate);

var data = fs.readFileSync('horoscopes.json');
var obj = JSON.parse(data);

// to store every horoscopes in dailyHoroscopes.json 
app.get('/horoscope', (req, res) => {
  var dailyData = JSON.parse(fs.readFileSync('dailyHoroscope.json'));
  var count = 0;
  for (var i = 0; i < dailyData.length; i++){
    if (dailyData[i][0]['Date'] == todaysDate){
      count++;
    }
  }if (count == 0){
    dailyData.push(obj);
    fs.writeFileSync('dailyHoroscope.json', JSON.stringify(dailyData));
    res.json(dailyData);
  }if (count > 0){
    res.json(dailyData);
  }
});


app.get('/horoscope/:user', (req, res) => {
    var sign = req.params.user;
    for (var i = 0; i < obj.length; i++){
      if (obj[i]['Sign'].toLowerCase() == sign && obj[i]['Date'] == todaysDate){
        return res.json(obj[i]);
      }
    }return res.json({errorMsg: "Sorry! You've entered something wrong!"});
});

var openAllJokes = fs.readFileSync('jokesScraper.json');
var allJokesData = JSON.parse(openAllJokes);

app.get('/totaljoke', (req, res) => {
  res.json(allJokesData);
  // console.log(JSON.stringify(obj));
})

function random(min, max){
  var random = String(Math.floor(Math.random() * (max - min) + min));
  return random;// random numbers
};

app.get('/totaljoke/random', (req, res) => {
  // const email = req.query.email;
  // console.log(email);
  var r_number = random(1, allJokesData.length);

  showDic = {};
  for(var j = 0; j < allJokesData.length; j++){
      var dict_j = allJokesData[j];
      var list_k = Object.keys(dict_j);
      // console.log(list_k)
      var dict_key = list_k[0];
      if (r_number == dict_key){
        showDic[r_number] = dict_j[dict_key]
        return res.json(showDic);
      }
    }
});

var serve = app.listen(8111, () => {
  var port = serve.address().port;
  console.log(`the port is listening at ${port}`);
});
