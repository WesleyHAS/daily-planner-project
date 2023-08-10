window.onload = function() {
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// });

// var now = dayjs();
// console.log(now);

//adds current date
var dateDisplayElement = document.getElementById("dateDisplay");
var currentDate = dayjs().format("dddd, MMMM DD - h:mm A");
dateDisplayElement.textContent = currentDate;

//check what is the current time and
//if the current time is past then remove current class and add past class.
//else if the current time is present then remove current class and add present class. 
//else if the current is future then remove current class and add future class.

/* var textHourElements = document.querySelectorAll('#get-hour');

textHourElements.forEach(function (textHourElement) {
  var textHour = textHourElement.textContent;
  var textTimeInteger = parseInt(textHour);
  // var now = dayjs();
  // var currentHour = now.hour();
  var currentHour = dayjs().hour();

  // console.log(typeof currentHour);
  // console.log(textTimeInteger);
  // console.log(dayjs(textTimeInteger));
  console.log(currentHour);

  if (textTimeInteger === currentHour) {
    $('.time-block').removeClass('past present future');
    $('.time-block').addClass('present');
  } else if (textTimeInteger < currentHour) {
    $('.time-block').removeClass('past present future');
    $('.time-block').addClass('past');
  } else if (textTimeInteger > currentHour) {
    $('.time-block').removeClass('past present future');
    $('.time-block').addClass('future');  
  }

}); */

var timeBlockElements = document.querySelectorAll('.time-block');

  var hourNumbers = Array.from(timeBlockElements).map(function(element) {
    var id = $(element).attr('id');
    var numericPart = id.split('-')[1];
    return parseInt(numericPart);
  });

  var currentHour = dayjs().hour();

  // Loop through time block elements and apply classes based on comparison
  timeBlockElements.forEach(function (element, index) {
    var hourNumber = hourNumbers[index];
    var $element = $(element);

    $element.removeClass('past present future'); // Clear previous classes

    if (hourNumber === currentHour) {
      $element.addClass('present');
    } else if (hourNumber < currentHour) {
      $element.addClass('past');
    } else if (hourNumber > currentHour) {
      $element.addClass('future');
    }
  });

// var textInput = JSON.parse(localStorage.getItem('inputcontent')) || ['', '', '', '', '', '', '', '', ''];

var storage = localStorage.getItem('inputcontent');
var textInput = JSON.parse(storage);
if (!textInput) {
  textInput = ['', '', '', '', '', '', '', '', ''];
}

$( ".btn" ).each(function( i ) {
  $(this).siblings('.description').val(textInput[i]);

  $(this).on('click', function() {
    var inputContent = $(this).siblings('.description').val();
    textInput[i] = inputContent;
  
    localStorage.setItem('inputcontent', JSON.stringify(textInput));
  } );

});
};