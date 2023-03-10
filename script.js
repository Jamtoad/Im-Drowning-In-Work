// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// Updates time in header
function updateTime () {
  $("#currentDay").text(dayjs().format("dddd, MMMM DD") + "th")
}

// Updates time blocks
function updateTimeBlocks() {
  let timeBlocks = $(".hour-blocks").children()
  let currentHour = Number(dayjs().format("H"))

  for (let index = 0; index < timeBlocks.length; index++) {
    let currentChild = $(timeBlocks).eq(index)
    let timeBlockTime = Number($(currentChild).attr("id").split("-")[1])

    console.log(currentHour, timeBlockTime)

    if (currentHour > timeBlockTime) {
      $(currentChild).addClass("past")
    } else if (currentHour < timeBlockTime) {
      $(currentChild).addClass("future")
    } else {
      $(currentChild).addClass("present")
    }
  }
}

function saveEntry(button) {
  let entryText = $(button.currentTarget).prev().val()
  let entryId = $(button.currentTarget).parent().attr("id")

  localStorage.setItem(entryId, entryText)
}

function loadEntries() {
  let timeBlocks = $(".hour-blocks").children()

  for (let index = 0; index < timeBlocks.length; index++) {
    let currentChild = $(timeBlocks).eq(index)
    let timeBlockId = $(currentChild).attr("id")
    let timeBlockText = localStorage.getItem(timeBlockId)

    console.log(timeBlockId, timeBlockText)
    console.log($(currentChild).find(".description"))

    $(currentChild).find(".description").val(timeBlockText)
  }
}

$(function () {
  updateTime()
  updateTimeBlocks()
  loadEntries()

  $(".saveBtn").on("click", saveEntry)

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
});
