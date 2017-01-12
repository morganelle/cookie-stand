'use strict';

// Store hours global variables
var storeOpen = 6;
var storeClose = 21;

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
  this.row = row.reduce(function(a, b) {return a.concat(b);}, []);
  return this.row;
};
Store.prototype.render = function() {
  this.calcCookieEst();
  console.log('render hourly cookies: ' + this.hourlyCookies);
  this.buildRow();
  console.log('render row: ' + this.row);
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

var populateTable = function(stores) {
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
};

// Adds hourly totals together for all stores
var hourlyTotals = function(stores) {
  var totalsArray = ['Hourly totals'];
  var dailyTotals = 0;
  for (var i = storeOpen; i < storeClose; i++) {
    var result = 0;
    for (var j = 0; j < stores.length; j++) {
      result += stores[j].hourlyCookies[i];
    }
    totalsArray.push(result);
    dailyTotals += result;
  }
  totalsArray.push(dailyTotals);
  return totalsArray;
};

var addStoreFormEl = document.getElementById('add-store-form'); // declares var from HTML form id

// register submit event on form
addStoreFormEl.addEventListener('submit', function() {submitEvent(event);}, false); // false included for old browsers; may be redundant if using stopPropagation

// Event handler
var submitEvent = function(event) {
  event.preventDefault(); // may be default to load page
  event.stopPropagation(); // if not added, could fire event to any ancestor element
  var ename = (event.target.storename.value);
  var emin = Number.parseInt(event.target.mincust.value);
  var emax = Number.parseInt(event.target.maxcust.value);
  var eavg = Number.parseInt(event.target.avgcookies.value);

  ename = new Store(ename, ename, emin, emax, eavg);
  console.log(ename);
  ename.render(ename);
  console.log('hourly cookies: ' + ename.hourlyCookies);
  stores.push(ename);
};

populateTable(stores);
// footer();
