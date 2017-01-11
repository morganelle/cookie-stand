'use strict';

// Store constructor
function Store(location, storeId, storeOpen, storeClose, minCust, maxCust, avgCookiesPerCust) {
  this.location = location;
  this.storeId = storeId;
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

// Construct new object
var firstAndPike = new Store('1st and Pike', 'first-and-pike', 6, 21, 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 'sea-tac', 6, 21, 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 'seattle-center', 6, 21, 11, 38, 3.7);
var capHill = new Store('Capitol Hill', 'cap-hill', 6, 21, 20, 38, 2.3);
var alki = new Store('Alki', 'alki', 6, 21, 2, 16, 4.6);

// New Store template
// var newStore = new Store(location, storeId, storeOpen, storeClose, minCust, maxCust, avgCookiesPerCust);

// All store objects in an array
var stores = [firstAndPike, seaTac, seattleCenter, capHill, alki];

// Declare variable for table with "sales" id
var tableEl = document.getElementById('sales');

// Populates table in HTML
var populateTable = function(stores) {
  // steps through stores array, creates a row, and adds a store name td, has a nested loop to add all items in hourlyCookies array
  for (var i = 0; i < stores.length; i++) {
    console.log('outer for loop begins ' + i);
    // var tableEl = document.getElementById('sales');
    var rowEl = document.createElement('tr');
    var store = stores[i];
    // Creates store name td at beginning of each tr
    var tableData = document.createElement('td');
    tableData.setAttribute('class','store-name');
    tableData.textContent = store.location;
    rowEl.appendChild(tableData);
    // runs calcCookieEst to get array of hourly estimates by store
    store.calcCookieEst();
    // steps through each array of store.hourlyCookies values and populates a td
    for (var j = 0; j <= store.hourlyCookies.length; j++) {
      var tableContent = store.hourlyCookies[j];
      var tableData = document.createElement('td');
      tableData.textContent = tableContent;
      rowEl.appendChild(tableData);
    }
    // add daily store estimates as last td
    tableData.textContent = store.dayTotal;
    rowEl.appendChild(tableData);
    // attaches the table row to DOM
    tableEl.appendChild(rowEl);
  }
};

// Populates footer with hourly totals
var footer = function(store) {
  var rowFooterEl = document.createElement('tr');
  var tableFooterData = document.createElement('td');
  tableFooterData.setAttribute('class','store-name');
  tableFooterData.textContent = 'Hourly totals';
  rowFooterEl.appendChild(tableFooterData);
  // For loop to add hourly totals across all stores
  for (var k = 0; k < firstAndPike.hourlyCookies.length; k++) {
    var tableFooterCount = document.createElement('td');
    tableFooterCount.textContent = firstAndPike.hourlyCookies[k] + seaTac.hourlyCookies[k] + seattleCenter.hourlyCookies[k] + capHill.hourlyCookies[k] + alki.hourlyCookies[k];
    rowFooterEl.appendChild(tableFooterCount);
  }
  // adds empty field as last td
  var tableFooterBlank = document.createElement('td');
  tableFooterBlank.textContent = ' ';
  rowFooterEl.appendChild(tableFooterBlank);
  // attaches the table row to DOM
  tableEl.appendChild(rowFooterEl);
};

populateTable(stores);
footer();
