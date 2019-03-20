function getMonthName(month) {

  var mom = moment();
  mom.month(month);

  var monthName = mom.format("MMMM")
  return monthName;
  console.log(monthName);
}


function getMonthDayCount(year, month) {

  var mom = moment().year(year).month(month);

  var daysCount = mom.daysInMonth();

  return daysCount;
}

function getHumanDate(year, month, day) {
  var mom = moment();
  mom.year(year);
  mom.month(month);
  mom.date(day);

}



function printTitle(year, month) {

var h1 = $("#month-name");
var monthName = getMonthName(month);
var daysCount = getMonthDayCount(year, month);
h1.text(monthName + " : " + " 1-" + daysCount);

}

function printDays(year, month) {

  var daysCount = getMonthDayCount(year, month);
  var ulListDay = $("ul#listDay");

  var template = $("#day-template");
  var compiled = Handlebars.compile(template);

  var mom = moment();
  mom.month(month);
  mom.year(year);

    for (var day = 1; i <= daysCount; day++) {

    }
}



function init() {

  var year = 2018;
  var month = 0;
  printTitle(year, month);
  printDays(year, month);
}




$(document).ready(init);
