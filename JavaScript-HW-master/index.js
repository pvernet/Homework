// Get references to the tbody element and button for loading additional results
var $tbody = document.querySelector("tbody");
var $DatetimeInput = document.querySelector("#Datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredAddresses to addressData initially
var filtereddataSet= dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filtereddataSet.length; i++) {
    // Get get the current address object and its fields
    var data = filtereddataSet[i];
    var fields = Object.keys(data);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = data[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filtereddatetime = 
  $DatetimeInput.value.trim();
  var filterCity= $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();
  


    
    
    

  // Set filteredAddresses to an array of all addresses who's "state" matches the filter
  filtereddataSet= 
  dataSet.filter(function(data) {
    var dataSetdatetime = data.datetime.substring(0, filtereddatetime .length);
    var dataSetcity = data.city.substring(0, filterCity.length).toLowerCase();
    var dataSetstate = data.state.substring(0, filterState.length).toLowerCase();
    var dataSetcountry = data.country.substring(0, filterCountry.length).toLowerCase();
    var dataSetshape = data.shape.substring(0, filterShape.length).toLowerCase();
    
    if (dataSetdatetime  === filtereddatetime  && dataSetcity===filterCity && dataSetstate===filterState && dataSetcountry===filterCountry && dataSetshape === filterShape) {
      return true;
    }
    return false;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();









