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



function printTitle(year, month) {

var h1 = $("#month-name");
var monthName = getMonthName(month);
var daysCount = getMonthDayCount(year, month);
h1.text(monthName + " : " + " 1-" + daysCount);

}



function init() {

  var year = 2018;
  var month = 0;
  printTitle(year, month);
  printDays(year, month);
}




$(document).ready(init);
