//Set filter to off
var filterCriteria = ""


//Set filters to be cleared
var date = ""
var city = ""
var state = ""
var country = ""
var shape = ""

//JSON link to PART for faster loading
var dataURL = '/Data/dataPart.json'

//function to render header and rows for table
function tabulate(data,columns) {
            //remove previous table
            d3.select('table').remove();
            
            // append table element, thead, and tbody
            var table = d3.select('.col-md-12').append('table').classed('table-striped', true)
            var thead = table.append('thead')
            var tbody = table.append('tbody')
            
            //append header columns for each key in the dataSet
            thead.append('tr').selectAll('th')
                .data(columns)
                .enter()
                .append('th')
                .text(column=> column)
                
                //append rows to body
                var rows = tbody.selectAll('tr')
                    .data(data)
                    .enter()
                    .append('tr')

                //append 'td' to each row for each value in the dataSet
                var cells = rows.selectAll('td')
                    .data(function (row) {
                    return columns.map(function (column) {
                      return {column: column, value: row[column]};
                    });
                  })
                    .enter()
                    .append('td')
                    .text(d=>d.value)
            return table;}

//function to check for filter criteria then call tabulate()
function renderTable() {
    d3.json(dataURL, function (error, data) {
        
        //if event handler changed filter to "yes" then filter through dataSet before rendering table
        if (filterCriteria == "yes") {
            
            //if date variable isn't empty then run filter
            if (date != "") {
                //use filter to return rows with matching date to date input from event handler
                data = data.filter(function(row) {
                    console.log("Filtering for date: ", date)
                    if(row.datetime == date){ return true }else{ return false}
                })
                }
            //if city variable isn't empty then run filter                    
            if (city != "") {
                data = data.filter(function(row) {
                    console.log("Filtering for city: ", city)
                    if(row.city == city){ return true } else{ return false}
                })    
                } 
            // if state variable isn't empty then run filter
            if (state != "") {
                data = data.filter(function(row) {
                    console.log("Filtering for state: ", state)
                    if(row.state == state){ return true }else{ return false}
                })
                }
            //if country variable isn't empty then run filter
            if (country != "") {
                data = data.filter(function(row) {
                    console.log("Filtering for country: ", country)
                    if(row.country == country){ return true }else{ return false}
                })
                }
            //if shape variable isn't empty then run filter
            if (shape != "") {
                data = data.filter(function(row) {
                    console.log("Filtering for shape: ", shape)
                    if(row.shape == shape){ return true }else{ return false}
                })
                }
            }
         
        
        tabulate(data, Object.keys(data[0]))
        
        //reset filter to off and all variables to blank
        filterCriteria = ""
        date = ""
        city = ""
        state = ""
        country = ""
        shape = ""

    })
}

//Render table upon loading
renderTable()


//Event handling for search clicking AND INPUT

//date
d3.select("#date-results").on("click", function(event) {
    d3.event.preventDefault()
    //store date input as variable "date"
 	date = d3.select("#date-input").node().value;
    d3.select("#date-input").node().value = "";
    console.log("Date search clicked")
    filterCriteria = "yes"
    renderTable()
})

//city
d3.select("#city-results").on("click", function(event) {
    d3.event.preventDefault()
    //store date input as variable "city"
 	city = d3.select("#city-input").node().value;
    d3.select("#city-input").node().value = "";
    console.log("City search clicked")
    filterCriteria = "yes"
    renderTable()
})

//state
d3.select("#state-results").on("click", function(event) {
    d3.event.preventDefault()
    //store date input as variable "state"
 	state = d3.select("#state-input").node().value;
    d3.select("#state-input").node().value = "";
    console.log("State search clicked")
    filterCriteria = "yes"
    renderTable()
})

//country
d3.select("#country-results").on("click", function(event) {
    d3.event.preventDefault()
    //store date input as variable "country"
 	country = d3.select("#country-input").node().value;
    d3.select("#country-input").node().value = "";
    console.log("Country search clicked")
    filterCriteria = "yes"
    renderTable()
})

//shape
d3.select("#shape-results").on("click", function(event) {
    d3.event.preventDefault()
    //store date input as variable "shape"
 	shape = d3.select("#shape-input").node().value;
    d3.select("#shape-input").node().value = "";
    console.log("Shape search clicked")
    filterCriteria = "yes"
    renderTable()
})





// --------- OLD javascript ONLY code
// console.log("I'm in index.js!")


// var filteredData = dataSet
// var jsonData = "./Data/dataPart.json"

// var $thead = document.querySelector('thead');
// var $tbody = document.querySelector('tbody');



// function renderTable() {
// 	$thead.innerHTML = '';
// 	var $header = $thead.insertRow()
// 	for (var a=0; a<Object.keys(filteredData[0]).length; a++) {
// 		var $headers = $header.insertCell(a)
// 		$headers.innerText = Object.keys(filteredData[0])[a]

// 		}

// 	$tbody.innerHTML = '';
// 	for (var i=0; i< 100; i++) { //filteredData should replace 100
// 		var keys = Object.keys(filteredData[i])
// 		var $row = $tbody.insertRow(i)
// 		for (var j=0; j<keys.length; j++) {
// 			var column = keys[j];
// 			var $td = $row.insertCell(j);
// 			$td.innerText = filteredData[i][column]

// 	$tbody.selectAll('')		



// 		}
// 	}
// }

// $search.on("click", function(event) {
// 	d3.event.preventDefault()
// 	var date = d3.select("#date-input").node().value;
// 	console.log(date)
// 	currentDates = d3.select('tbody').selectAll('tr')
// 	console.log(currentDates[0].select('td').node().value)
// 	for (var i = 0; i<currentDates.length; i++) {
// 		if ((currentDates[i].select('td').node().value) != date) {
// 			d3.select('tbody').selectAll('tr').deleteRow()
// 		}
// 	}
// 	})


// // function renderTable() {
// // 	thead.append('tr').selectAll('th')
// // 	.data(Object.keys(filteredData[0])
// // 	.enter()
// // 	.append('th')
// // 	.text(d=>)
// // }

// renderTable();