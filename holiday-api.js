function prevMonth(year,month) {

  month--;

  printAll();
  printTitle(year, month);
  printDays(year, month);
  printHolidays(year, month);


  return month;

}

function nextMonth(year,month) {

  month++;

  printAll();
  printTitle(year, month);
  printDays(year, month);
  printHolidays(year, month);



  return month;

}





function getMonthName(month) {

  var mom = moment();
  mom.month(month);

  var monthName = mom.format("MMMM")

  return monthName;

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

  var date = mom.format("DD ddd")

  return date;

}

function getMachineDate(year, month, day) {

  var mom = moment();
  mom.year(year);
  mom.month(month);
  mom.date(day);

  var date = mom.format("YYYY-MM-DD")

  return date;

}



function printTitle(year, month) {

  var h1 = $("#month-name");
  var monthName = getMonthName(month);
  var daysCount = getMonthDayCount(year, month);
  console.log(h1);
  h1.text(monthName + "  " + year);

}

function printDays(year, month) {

  var daysCount = getMonthDayCount(year, month);
  var ulListDay = $(".days-container");

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

      if (inData.success) {

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

function printAll() {

  var h1 = $("h1");
  h1.text("");

  var li = $("li");
  li.remove();
}


function addHolidayHighlight(holidays) {

  var holiday;

  for (var i = 0; i < holidays.length; i++) {
    holiday = holidays[i];
    var holidayMachine = holiday.date;
    var holidayName = holiday.name;

    var selector = "li[data-date='" + holidayMachine + "']"
    var liHoliday = $(selector);

    liHoliday.addClass("red");
    liHoliday.text(liHoliday.text() + " - " + holidayName);
  }
;
}

function init() {

  var year = 2018;
  var month = 0;

  printTitle(year, month);
  printDays(year, month);
  printHolidays(year, month);

  var buttonRight = $("input#button-right");
  var buttonLeft = $("input#button-left");


  buttonRight.click(function() {
    if (month < 11) {

      month = nextMonth(year, month);
    }


  });

  buttonLeft.click(function() {
    if (month > 0) {

    month = prevMonth(year, month);
    }

  });
}




$(document).ready(init);
