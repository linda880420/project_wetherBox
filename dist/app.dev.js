"use strict";

var main_area = document.querySelector('.main_area'); //我想要抓時間

var date = new Date();
var all = document.querySelector('.all');
var north = document.querySelector('.north');
var central = document.querySelector('.central');
var south = document.querySelector('.south');
var east = document.querySelector('.east');
var island = document.querySelector('.island');
var weather_png;
var area = document.querySelectorAll('.area');
var container1 = document.querySelector('.container1');

function startTime() {
  var today = new Date(); //定義日期物件   

  var yyyy = today.getFullYear(); //通過日期物件的getFullYear()方法返回年    

  var MM = today.getMonth() + 1; //通過日期物件的getMonth()方法返回年    

  var dd = today.getDate(); //通過日期物件的getDate()方法返回年     

  var hh = today.getHours(); //通過日期物件的getHours方法返回小時   

  var mm = today.getMinutes(); //通過日期物件的getMinutes方法返回分鐘   

  var ss = today.getSeconds(); //通過日期物件的getSeconds方法返回秒   
  // 如果分鐘或小時的值小於10，則在其值前加0，比如如果時間是下午3點20分9秒的話，則顯示15：20：09   

  MM = checkTime(MM);
  dd = checkTime(dd);
  mm = checkTime(mm);
  ss = checkTime(ss);
  var day; //用於儲存星期（getDay()方法得到星期編號）

  if (today.getDay() == 0) day = "S U N. ";
  if (today.getDay() == 1) day = "M O N. ";
  if (today.getDay() == 2) day = "T U E. ";
  if (today.getDay() == 3) day = "W E D. ";
  if (today.getDay() == 4) day = "T H U. ";
  if (today.getDay() == 5) day = "F R I. ";
  if (today.getDay() == 6) day = "S A T. ";
  document.querySelector('#nowDateTimeSpan').innerHTML = yyyy;
  document.querySelector('#nowDateTimeSpan2').innerHTML = MM;
  document.querySelector('#nowDateTimeSpan3').innerHTML = dd;
  document.querySelector('#nowDateTimeSpan4').innerHTML = hh + ":" + mm + ":" + ss;
  document.querySelector('#nowDateTimeSpan5').innerHTML = day;
  setTimeout('startTime()', 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }

  return i;
}

startTime(); // show_weather_cards();

fetchList();
bg_chnge();

function bg_chnge() {
  var today = new Date();
  var hh = today.getHours();

  if (19 <= hh && hh <= 24) {
    container1.classList.add('bg');
  } else container1.classList.remove('bg');
}

function fetchList() {
  fetch('https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-82546646-C2D2-4070-902B-B0974C6F2646').then(function (response) {
    return response.json();
  }).then(function (result) {
    console.log(result.records.location);
    var locationList = result.records.location;
    console.log(locationList); //北區過濾：臺北市、新北市、基隆市、新竹市、桃園市、新竹縣及宜蘭縣

    var locationListNorth = locationList.filter(function (item) {
      if (item.locationName.includes('臺北市') || item.locationName.includes('新北市') || item.locationName.includes('基隆市') || item.locationName.includes('新竹市') || item.locationName.includes('桃園市') || item.locationName.includes('新竹縣') || item.locationName.includes('宜蘭縣')) {
        console.log('我是北部', item.locationName);
        return item;
      }
    });
    console.log('我是北部', locationListNorth); // 中部區域：包括臺中市、苗栗縣、彰化縣、南投縣及雲林縣

    var locationListCentral = locationList.filter(function (item) {
      if (item.locationName.includes('臺中市') || item.locationName.includes('苗栗縣') || item.locationName.includes('彰化縣') || item.locationName.includes('南投縣') || item.locationName.includes('雲林縣')) {
        console.log('我是中部', item);
        return item;
      }
    }); // 南部區域：包括高雄市、臺南市、嘉義市、嘉義縣、屏東縣及澎湖縣

    var locationListSouth = locationList.filter(function (item) {
      if (item.locationName.includes('高雄市') || item.locationName.includes('臺南市') || item.locationName.includes('嘉義市') || item.locationName.includes('嘉義縣') || item.locationName.includes('屏東縣')) {
        console.log('我是南部', item);
        return item;
      }
    }); // 花蓮縣及臺東縣

    var locationListEast = locationList.filter(function (item) {
      if (item.locationName.includes('花蓮縣') || item.locationName.includes('臺東縣')) {
        console.log('我是東部', item);
        console.log('我是東部', item['locationName']);
        return item;
      }
    });
    var locationListIsland = locationList.filter(function (item) {
      if (item.locationName.includes('澎湖縣') || item.locationName.includes('金門縣') || item.locationName.includes('連江縣')) {
        console.log('我是東部', item);
        console.log('我是東部', item['locationName']);
        return item;
      }
    });
    all.style.backgroundColor = 'rgb(' + 227 + ',' + 237 + ',' + 255 + ')';
    show_weather_cards(locationList);
    weather_png = document.querySelectorAll('.weather_png');
    show_img(locationList);
    show_area(all, locationList);
    show_area(north, locationListNorth);
    show_area(central, locationListCentral);
    show_area(south, locationListSouth);
    show_area(east, locationListEast);
    show_area(island, locationListIsland);
  });
}

;

function show_weather_cards(data) {
  for (i = 0; i < data.length; i++) {
    main_area.innerHTML += "\n                <div class=\"weather_card col-12 col-lg-5 col-md-5 col-sm-12 col-xs-12 p-0\"> \n                   <div class=\"card p-4  py-5 position-relative\">    \n                       <div class>\n                        <h6 class=\"flex-grow-1 my-3 location_name\">".concat(data[i]['locationName'], "</h6>\n                        <span class=\"small grey parameter\">").concat(data[i]['weatherElement'][0]['time'][0]['parameter']['parameterName'], "</span>\u2212\n                        <span class=\"small grey parameter\">").concat(data[i]['weatherElement'][3]['time'][0]['parameter']['parameterName'], "</span>\n                        </div>\n                       <div class=\"d-flex flex-column temp mt-4 mb-3\">\n                           <h1 class=\"mb-5 font-weight-bold temp w-100\" id=\"heading\"> ").concat(data[i]['weatherElement'][2]['time'][0]['parameter']['parameterName'], "&deg;C ~ ").concat(data[i]['weatherElement'][4]['time'][0]['parameter']['parameterName'], "&deg;C </h1>\n                           \n                       </div>\n                       \n                       <div class=\"d-flex\">\n                           <div class=\"temp-details flex-grow-1\">\n                                <p class=\"my-1\">\n                                    <img src=\"./img/wind.png\" height=\"17px\" >\n                                   <span> ").concat(data[i]['weatherElement'][4]['time'][0]['parameter']['parameterName'], " km/h  </span>\n                                </p>\n                                <p class=\"my-1 d-flex align-items-center\"> \n                                   <img class=\"me-2\"src=\"./img/rainy.png\" height=\"17px\" >\n                                   <span class=\"pop\"> ").concat(data[i]['weatherElement'][1]['time'][0]['parameter']['parameterName'], "% </span> \n                                </p>\n                           </div>\n                           \n                           <div class=\"\">\n                               <img class=\"weather_png position-absolute\" src=\"\" width=\"180px\">\n                           </div>\n                       </div>\n                    </div>\n            </div>\n        ");
  }
}

function show_img(data) {
  var today = new Date();
  var hh = today.getHours();
  console.log('hh', hh);
  weather_png.forEach(function (item, index) {
    Wx = data[index]['weatherElement'][0]['time'][0]['parameter']['parameterName'];

    if (6 <= hh && hh <= 18) {
      if (Wx == '晴時多雲') {
        console.log('true1');
        console.log(item);
        console.log(index);
        item.src = "./gif/晴時多雲.gif";
      } else if (Wx == '多雲時晴') {
        console.log(item);
        console.log(index);
        item.src = "./gif/多雲時晴.gif";
      } else if (Wx == '多雲' || Wx.includes("陰")) {
        console.log(item);
        console.log(index);
        item.src = "./gif/多雲.gif";
      } else if (Wx == '晴午後短暫雷陣雨') {
        console.log(item);
        console.log(index);
        console.log('--晴午後短暫雷陣雨');
        item.src = "./gif/晴午.gif";
      } else if (Wx == "多雲午後短暫雷陣雨") {
        console.log(item);
        console.log(index);
        console.log('-- 多雲午後短暫雷陣雨');
        item.src = "./gif/多雲午後短暫雷陣雨.gif";
      } else if (Wx.includes("雨")) {
        console.log(item);
        console.log(index);
        console.log('-- 雨');
        item.src = "./gif/雨.gif";
      } else if (Wx.includes("晴天")) {
        console.log(item);
        console.log(index);
        console.log('-- 雨');
        item.src = "./gif/晴天.gif";
      }
    } else {
      if (Wx == '晴時多雲') {
        console.log('true1');
        console.log(item);
        console.log(index);
        item.src = "./gif/夜晴時多雲.gif";
      } else if (Wx == '多雲時晴') {
        console.log(item);
        console.log(index);
        item.src = "./gif/夜多雲時晴.gif";
      } else if (Wx == '多雲' || Wx.includes("陰")) {
        console.log(item);
        console.log(index);
        item.src = "./gif/夜多雲.gif";
      } else if (Wx == '晴午後短暫雷陣雨') {
        console.log(item);
        console.log(index);
        console.log('--晴午後短暫雷陣雨');
        item.src = "./gif/夜晴午.gif";
      } else if (Wx == "多雲午後短暫雷陣雨") {
        console.log(item);
        console.log(index);
        console.log('-- 多雲午後短暫雷陣雨');
        item.src = "./gif/夜多雲午後短暫雷陣雨.gif";
      } else if (Wx.includes("雨")) {
        console.log(item);
        console.log(index);
        console.log('-- 雨');
        item.src = "./gif/夜雨.gif";
      } else if (Wx.includes("晴天")) {
        console.log(item);
        console.log(index);
        console.log('-- 雨');
        item.src = "./gif/夜晴天.gif";
      }
    }
  });
}

function nav_bg_clear() {
  area.forEach(function (item) {
    item.style.backgroundColor = 'rgb(' + 164 + ',' + 182 + ',' + 214 + ')';
  });
}

function show_area(area, data) {
  area.addEventListener('click', function () {
    nav_bg_clear();
    area.style.backgroundColor = 'rgb(' + 227 + ',' + 237 + ',' + 255 + ')';
    main_area.innerHTML = '';
    show_weather_cards(data);
    weather_png = document.querySelectorAll('.weather_png');
    show_img(data);
    console.log(all.style);
  });
}