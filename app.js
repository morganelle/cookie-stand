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
  return (Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
};
Store.prototype.calcHourlyCookiesEst = function() {
  for (var index = this.storeOpen; index <= this.storeClose; index++) {
    this.hourlyCookies.push(Math.round(this.custVolumeEst() * this.avgCookiesPerCust));
  }
  return this.hourlyCookies;
};
Store.prototype.calcDailyCookiesEst = function() {
  this.dayTotal = this.hourlyCookies.reduce(function(a,b) {
    return a + b;
  });
  return this.dayTotal;
};

// Construct new object
var firstAndPike = new Store('1st and Pike', 'first-and-pike', 6, 20, 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 'sea-tac', 6, 20, 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 'seattle-center', 6, 20, 11, 38, 3.7);
var capHill = new Store('Capitol Hill', 'cap-hill', 6, 20, 3, 24, 1.2);
var alki = new Store('Alki', 'alki', 6, 20, 3, 24, 1.2);

// New Store template
// var newStore = new Store(location, storeId, storeOpen, storeClose, minCust, maxCust, avgCookiesPerCust);

// Store object literals
//
// var seattleCenter = {
//   location: 'Seattle Center',
//   storeId: 'seattle-center',
//   storeOpen:6,
//   storeClose:20,
//   minCust: 11,
//   maxCust: 38,
//   avgCookiesPerCust: 3.7,
//   hourlyCookies:[],
//   dayTotal: 0,
//   custVolumeEst: function() {
//     return (Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
//   },
//   calcHourlyCookiesEst: function() {
//     for (var index = this.storeOpen; index <= this.storeClose; index++) {
//       this.hourlyCookies.push(Math.round(this.custVolumeEst() * this.avgCookiesPerCust));
//     }
//     return this.hourlyCookies;
//   },
//   calcDailyCookiesEst: function() {
//     this.dayTotal = this.hourlyCookies.reduce(function(a,b) {
//       return a + b;
//     });
//     return this.dayTotal;
//   }
// };
//
// var capHill = {
//   location: 'Capitol Hill',
//   storeId: 'cap-hill',
//   storeOpen:6,
//   storeClose:20,
//   minCust: 20,
//   maxCust: 38,
//   avgCookiesPerCust: 2.3,
//   hourlyCookies:[],
//   dayTotal: 0,
//   custVolumeEst: function() {
//     return (Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
//   },
//   calcHourlyCookiesEst: function() {
//     for (var index = this.storeOpen; index <= this.storeClose; index++) {
//       this.hourlyCookies.push(Math.round(this.custVolumeEst() * this.avgCookiesPerCust));
//     }
//     return this.hourlyCookies;
//   },
//   calcDailyCookiesEst: function() {
//     this.dayTotal = this.hourlyCookies.reduce(function(a,b) {
//       return a + b;
//     });
//     return this.dayTotal;
//   }
// };
//
// var alki = {
//   location: 'Alki',
//   storeId: 'alki',
//   storeOpen:6,
//   storeClose:20,
//   minCust: 2,
//   maxCust: 16,
//   avgCookiesPerCust: 4.6,
//   hourlyCookies:[],
//   dayTotal: 0,
//   custVolumeEst: function() {
//     return (Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
//   },
//   calcHourlyCookiesEst: function() {
//     for (var index = this.storeOpen; index <= this.storeClose; index++) {
//       this.hourlyCookies.push(Math.round(this.custVolumeEst() * this.avgCookiesPerCust));
//     }
//     return this.hourlyCookies;
//   },
//   calcDailyCookiesEst: function() {
//     this.dayTotal = this.hourlyCookies.reduce(function(a,b) {
//       return a + b;
//     });
//     return this.dayTotal;
//   }
// };

// Runs object methods to calculate hourly and daily store estimates
var calculateValues = function(store) {
  store.calcHourlyCookiesEst();
  store.calcDailyCookiesEst();
};

// Populates cookie sales in a list
var populateContent = function(store) {
  var storeList = document.getElementById(store.storeId);
  // For loop that creates list items for each item in the hourlyCookies array
  for (var i = 0; i < store.hourlyCookies.length; i++) {
    var listElement = document.createElement('li');
    listElement.textContent = (i + 6) + ':00 - ' + store.hourlyCookies[i] + ' cookies';
    storeList.appendChild(listElement);
  }
  // Adds list item with total daily cookies and a class attribute
  var totalListElement = document.createElement('li');
  totalListElement.setAttribute('class','total');
  totalListElement.textContent = 'Total: ' + store.dayTotal + ' cookies';
  storeList.appendChild(totalListElement);
};

// All store objects in an array
var stores = [firstAndPike, seaTac, seattleCenter, capHill, alki];

// Function that runs the store estimates and inserts them into the HTML; for loop iterates through stores array
var runStoreNumbers = function() {
  for (var index = 0; index < stores.length; index++) {
    calculateValues(stores[index]);
    populateContent(stores[index]);
  }
};

runStoreNumbers();
