'use strict';

// GLOBAL VARIABLES
var storeOpen = 6; // Store hours global variables
var storeClose = 21;
var totalsArray; // Hourly totals for all stores

// Store constructor
function Store(location, storeId, minCust, maxCust, avgCookiesPerCust) {
  this.location = location;
  this.storeId = storeId;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.hourlyCookies = [];
  this.dayTotal = 0;
}
// Store methods
Store.prototype.custVolumeEst = function() {
  return (Math.floor(Math.random() * (storeClose - storeOpen) + this.minCust));
};
Store.prototype.calcCookieEst = function() {
  for (var index = storeOpen; index < storeClose; index++) {
    var result = Math.round(this.custVolumeEst() * this.avgCookiesPerCust);
    this.hourlyCookies.push(result);
    this.dayTotal += result;
  }
};
Store.prototype.buildRow = function() {
  var row = [];
  row.push(this.hourlyCookies);
  row.push(this.dayTotal);
  row.unshift(this.location);
  // flattens nested array
  this.row = row.reduce(function(a, b) {return a.concat(b);}, []);
  return this.row;
};
Store.prototype.render = function() {
  this.calcCookieEst();
  this.buildRow();
  var rowEl = document.createElement('tr');
  for (var j = 0; j < this.row.length; j++) {
    var tableDataEl = document.createElement('td');
    tableDataEl.textContent = this.row[j];
    rowEl.appendChild(tableDataEl);
  }
  tableEl.appendChild(rowEl);
};

// Construct new object
var firstAndPike = new Store('1st and Pike', 'first-and-pike', 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 'sea-tac', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 'seattle-center', 11, 38, 3.7);
var capHill = new Store('Capitol Hill', 'cap-hill', 20, 38, 2.3);
var alki = new Store('Alki', 'alki', 2, 16, 4.6);

// New Store template
// var newStore = new Store(location, storeId, minCust, maxCust, avgCookiesPerCust);

// All store objects in an array
var stores = [firstAndPike, seaTac, seattleCenter, capHill, alki];

// Declare variable for table with "sales" id
var tableEl = document.getElementById('sales');

// Function to convert store hour numbers into hour strings
function convertHours(hour) {
  if (hour < 12) {
    return hour + ':00am';
  }
  else if (hour === 12) {
    return hour + ':00pm';
  }
  else {
    return (hour - 12) + ':00pm';
  }
}

// Prints trs and tds for store hours
function populateHours() {
  // Create tr and add a blank td
  var rowEl = document.createElement('tr');
  rowEl.setAttribute('class','times');
  var tableDataEl = document.createElement('td');
  tableDataEl.textContent = ('');
  rowEl.appendChild(tableDataEl);
  // Create store hour tds
  for (var i = storeOpen; i < storeClose; i++) {
    var tableDataEl = document.createElement('td');
    tableDataEl.textContent = convertHours(i);
    rowEl.appendChild(tableDataEl);
  }
  // Create Daily totals td
  var tableDataEl = document.createElement('td');
  tableDataEl.textContent = ('Daily totals');
  rowEl.appendChild(tableDataEl);
  // Append row to table
  tableEl.appendChild(rowEl);
}

// Prints trs and tds for store row arrays
function populateTable(stores) {
  for (var i = 0; i < stores.length; i++) {
    var store = stores[i];
    var rowEl = document.createElement('tr');
    stores[i].calcCookieEst();
    stores[i].buildRow();
    // iterate through store rows to print table rows
    for (var j = 0; j < store.row.length; j++) {
      var tableDataEl = document.createElement('td');
      tableDataEl.textContent = store.row[j];
      rowEl.appendChild(tableDataEl);
    }
    tableEl.appendChild(rowEl);
  }
}

// Adds hourly totals together for all stores
function hourlyTotals(stores) {
  totalsArray = ['Hourly totals'];
  var dailyTotals = 0;
  for (var i = 0; i < (storeClose - storeOpen); i++) {
    var result = 0;
    for (var j = 0; j < stores.length; j++) {
      result += stores[j].hourlyCookies[i];
    }
    totalsArray.push(result);
    dailyTotals += result;
  }
  totalsArray.push(dailyTotals);
  return totalsArray;
}

// Prints hourly totals to HTML table
function populateHourlyTotals(stores) {
  hourlyTotals(stores);
  var rowEl = document.createElement('tr');
  rowEl.setAttribute('id', 'results');
  for (var i = 0; i < totalsArray.length; i++) {
    var tableDataEl = document.createElement('td');
    tableDataEl.textContent = totalsArray[i];
    rowEl.appendChild(tableDataEl);
  }
  tableEl.appendChild(rowEl);
}

// Remove hourly totals - specifically when new stores get added
function removeHourlyTotals() {
  var removeEl = document.getElementById('results');
  var containerEl = removeEl.parentNode;
  containerEl.removeChild(removeEl);
}

var addStoreFormEl = document.getElementById('add-store-form'); // declares var from HTML form id

// register submit event on form
addStoreFormEl.addEventListener('submit', function() {submitEvent(event);}, false);

// Event handler
function submitEvent(event) {
  event.preventDefault(); // may be default to load page
  event.stopPropagation(); // if not added, could fire event to any ancestor element
  // Assigns variables to form input data
  var ename = (event.target.storename.value);
  var emin = Number.parseInt(event.target.mincust.value);
  var emax = Number.parseInt(event.target.maxcust.value);
  var eavg = Number.parseInt(event.target.avgcookies.value);
  // Calls store constructor, with form input values as arguments
  ename = new Store(ename, ename, emin, emax, eavg);
  ename.render(ename);
  stores.push(ename);
  // Deletes hourly totals row before re-populating it to include the new store
  removeHourlyTotals();
  populateHourlyTotals(stores);
}

// Call functions to populate table data
populateHours();
populateTable(stores);
populateHourlyTotals(stores);
