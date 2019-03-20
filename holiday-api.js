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

  var date = mom.format("DD MMMM YY")

  return date;

}

function getMachineDate(year, month, day) {
  var mom = moment();
  mom.year(year);
  mom.month(month);
  mom.date(day);

  var date = mom.format("YYYY MM DD")

  return date;

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

  var template = $("#day-template").html();
  var compiled = Handlebars.compile(template);



    for (var day = 1; day <= daysCount; day++) {


      var tempDate = {

      machineDate : getMachineDate(year, month, day),
      date :getHumanDate(year, month, day)
      }
      var liDay = compiled(tempDate);
      ulListDay.append(liDay);
    }
}

function printHolidays(year, month) {

var outData = {
  year : year,
  month: month
}
  $.ajax({

    url: "https://flynn.boolean.careers/exercises/api/holidays",
    data: outData,
    method : "GET",
    success : function(inData, state) {

      if (inData.success == true) {

          var holidays = inData.response;
          addHolidayHighlight(holidays);
      } else {

        console.log("Communication error");
      }
    },
    error: function (request, state, error) {
      console.log("request" , date);
      console.log("state" , state);
      console.log("date" , error);
    }
  });
}

function addHolidayHighlight(holidays) {
var holiday;
  for (var i = 0; i < holidays.length; i++) {

   holiday = holidays[i];
  var holidayMachine = holiday.date
  var holidayName = holiday.name

  var selector = "li[data-date='" + holidayMachine + "']"
  console.log(selector);
  }
}

function init() {

  var year = 2018;
  var month = 0;
  printTitle(year, month);
  printDays(year, month);
  printHolidays(year, month);
}




$(document).ready(init);
