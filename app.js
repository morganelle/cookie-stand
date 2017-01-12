'use strict';

// Store constructor
function Store(location, storeOpen, storeClose, minCust, maxCust, avgCookiesPerCust) {
  this.location = location;
  this.storeOpen = storeOpen;
  this.storeClose = storeClose;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.hourlyCookies = [];
  this.dayTotal = 0;
}

Store.prototype.custVolumeEst = function() {
  return (Math.floor(Math.random() * (this.storeClose - this.storeOpen) + this.minCust));
};
Store.prototype.calcCookieEst = function() {
  for (var index = this.storeOpen; index < this.storeClose; index++) {
    var result = Math.round(this.custVolumeEst() * this.avgCookiesPerCust);
    this.hourlyCookies.push(result);
    this.dayTotal += result;
  }
};
Store.prototype.buildRow = function() {
  this.row = this.hourlyCookies;
  this.row.push(this.dayTotal);
  this.row.unshift(this.location);
  return this.row;
};
Store.prototype.render = function() {
  this.calcCookieEst();
  this.buildRow();
  var rowEl = document.createElement('tr');
  for (var i = 0; i < this.row.length; i++) {
    var tableDataEl = document.createElement('td');
    tableDataEl.textContent = this.row[i];
    rowEl.appendChild(tableDataEl);
  }
  tableEl.appendChild(rowEl);
};

// Construct new object
var firstAndPike = new Store('1st and Pike', 6, 21, 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 6, 21, 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 6, 21, 11, 38, 3.7);
var capHill = new Store('Capitol Hill', 6, 21, 20, 38, 2.3);
var alki = new Store('Alki', 6, 21, 2, 16, 4.6);

// New Store template
// var newStore = new Store(location, storeId, storeOpen, storeClose, minCust, maxCust, avgCookiesPerCust);

// All store objects in an array
var stores = [firstAndPike, seaTac, seattleCenter, capHill, alki];

// Declare variable for table with "sales" id
var tableEl = document.getElementById('sales');

// Populates table in HTML
var populateRow = function(store) {
  store.calcCookieEst();
  store.buildRow();
  var rowEl = document.createElement('tr');
  for (var i = 0; i < store.row.length; i++) {
    var tableDataEl = document.createElement('td');
    tableDataEl.textContent = store.row[i];
    rowEl.appendChild(tableDataEl);
  }
  tableEl.appendChild(rowEl);
};

firstAndPike.render();
seaTac.render();
seattleCenter.render();
capHill.render();
alki.render();

// // Populates footer table row with hourly totals
// var footer = function(store) {
//   var rowFooterEl = document.createElement('tr');
//   var tableFooterData = document.createElement('td');
//   tableFooterData.setAttribute('class','store-name');
//   tableFooterData.textContent = 'Hourly totals';
//   rowFooterEl.appendChild(tableFooterData);
//   // For loop to add hourly totals across all stores
//   for (var k = 0; k < firstAndPike.hourlyCookies.length; k++) {
//     var tableFooterCount = document.createElement('td');
//     tableFooterCount.textContent = firstAndPike.hourlyCookies[k] + seaTac.hourlyCookies[k] + seattleCenter.hourlyCookies[k] + capHill.hourlyCookies[k] + alki.hourlyCookies[k];
//     rowFooterEl.appendChild(tableFooterCount);
//   }
//   // adds empty field as last td
//   var tableFooterBlank = document.createElement('td');
//   tableFooterBlank.textContent = ' ';
//   rowFooterEl.appendChild(tableFooterBlank);
//   // attaches the table row to DOM
//   tableEl.appendChild(rowFooterEl);
// };

var addStoreFormEl = document.getElementById('add-store-form'); // declares var from HTML form id

// register submit event on form
addStoreFormEl.addEventListener('submit', function() {submitEvent(event);}, false); // false included for old browsers; may be redundant if using stopPropagation

// Event handler, a la arthur
var submitEvent = function(event) {
  event.preventDefault(); // may be default to load page
  event.stopPropagation(); // if not added, could fire event to any ancestor element
  var ename = (event.target.storename.value);
  var eopen = Number.parseInt(event.target.storeopen.value);
  var eclose = Number.parseInt(event.target.storeclose.value);
  var emin = Number.parseInt(event.target.mincust.value);
  var emax = Number.parseInt(event.target.maxcust.value);
  var eavg = Number.parseInt(event.target.avgcookies.value);

  ename = new Store(ename, eopen, eclose, emin, emax, eavg);
  console.log(ename);
  ename.render();
  console.log(ename.hourlyCookies);
};

// footer();
