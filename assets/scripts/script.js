window.onload = function() {

//adds current date
var dateDisplayElement = document.getElementById("dateDisplay");
var currentDate = dayjs().format("dddd, MMMM DD - h:mm A");
dateDisplayElement.textContent = currentDate;

//selects the hour-x id to compare it with the actual time in dayjs
var timeBlockElements = document.querySelectorAll('.time-block');

//get the hour number and split in into an array
  var hourNumbers = Array.from(timeBlockElements).map(function(element) {
    var id = $(element).attr('id');
    var numericPart = id.split('-')[1];
    return parseInt(numericPart);
  });

  //get current hour from dayjs
  var currentHour = dayjs().hour();

  // Loop through time block elements and apply classes based on comparison
  timeBlockElements.forEach(function (element, index) {
    var hourNumber = hourNumbers[index];
    var $element = $(element);

    // Clear previous classes
    $element.removeClass('past present future');

    if (hourNumber === currentHour) {
      $element.addClass('present');
    } else if (hourNumber < currentHour) {
      $element.addClass('past');
    } else if (hourNumber > currentHour) {
      $element.addClass('future');
    }
  });


//store the input text into the local storage
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