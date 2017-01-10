'use strict';

var stores = [firstAndPike, seaTac];

var firstAndPike = {
  location: '1st and Pike',
  storeId: 'first-and-pike',
  storeOpen:6,
  storeClose:20,
  minCust: 23,
  maxCust: 65,
  avgCookiesPerCust: 6.3,
  hourlyCookies:[],
  custVolumeEst: function() {
    return (Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
  },
  calcHourlyCookiesEst: function() {
    for (var index = this.storeOpen; index <= this.storeClose; index++) {
      this.hourlyCookies.push(Math.round(this.custVolumeEst() * this.avgCookiesPerCust));
      console.log('loop ran');
    }
    return this.hourlyCookies;
  },
  calcDailyCookiesEst: function() {
    if (this.hourlyCookies.length > 0) {
      var dayTotal = this.hourlyCookies.reduce(function(a,b) {
        return a + b;
      });
      return dayTotal;
    } else {
      this.calcHourlyCookiesEst();
      var dayTotal = this.hourlyCookies.reduce(function(a,b) {
        return a + b;
      });
      return dayTotal;
    }
  }
};

var seaTac = {
  location: 'SeaTac Airport',
  storeId: 'sea-tac',
  storeOpen:6,
  storeClose:21,
  minCust: 3,
  maxCust: 24,
  avgCookiesPerCust: 1.2,
  hourlyCookies:[],
  custVolumeEst: function() {
    return (Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
  },
  calcHourlyCookiesEst: function() {
    for (var index = this.storeOpen; index <= this.storeClose; index++) {
      this.hourlyCookies.push(Math.round(this.custVolumeEst() * this.avgCookiesPerCust));
      console.log('loop ran');
    }
    return this.hourlyCookies;
  },
  calcDailyCookiesEst: function() {
    if (this.hourlyCookies.length > 0) {
      var dayTotal = this.hourlyCookies.reduce(function(a,b) {
        return a + b;
      });
      return dayTotal;
    } else {
      this.calcHourlyCookiesEst();
      var dayTotal = this.hourlyCookies.reduce(function(a,b) {
        return a + b;
      });
      return dayTotal;
    }
  }
};

var seattleCenter = {
  location: 'Seattle Center',
  storeId: 'seattle-center',
  storeOpen:6,
  storeClose:21,
  minCust: 11,
  maxCust: 38,
  avgCookiesPerCust: 3.7,
  hourlyCookies:[],
  custVolumeEst: function() {
    return (Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
  },
  calcHourlyCookiesEst: function() {
    for (var index = this.storeOpen; index <= this.storeClose; index++) {
      this.hourlyCookies.push(Math.round(this.custVolumeEst() * this.avgCookiesPerCust));
      console.log('loop ran');
    }
    return this.hourlyCookies;
  },
  calcDailyCookiesEst: function() {
    if (this.hourlyCookies.length > 0) {
      var dayTotal = this.hourlyCookies.reduce(function(a,b) {
        return a + b;
      });
      return dayTotal;
    } else {
      this.calcHourlyCookiesEst();
      var dayTotal = this.hourlyCookies.reduce(function(a,b) {
        return a + b;
      });
      return dayTotal;
    }
  }
};

var capHill = {
  location: 'Capital Hill',
  storeId: 'cap-hill',
  storeOpen:6,
  storeClose:21,
  minCust: 20,
  maxCust: 38,
  avgCookiesPerCust: 2.3,
  hourlyCookies:[],
  custVolumeEst: function() {
    return (Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
  },
  calcHourlyCookiesEst: function() {
    for (var index = this.storeOpen; index <= this.storeClose; index++) {
      this.hourlyCookies.push(Math.round(this.custVolumeEst() * this.avgCookiesPerCust));
      console.log('loop ran');
    }
    return this.hourlyCookies;
  },
  calcDailyCookiesEst: function() {
    if (this.hourlyCookies.length > 0) {
      var dayTotal = this.hourlyCookies.reduce(function(a,b) {
        return a + b;
      });
      return dayTotal;
    } else {
      this.calcHourlyCookiesEst();
      var dayTotal = this.hourlyCookies.reduce(function(a,b) {
        return a + b;
      });
      return dayTotal;
    }
  }
};

var alki = {
  location: 'Alki',
  storeId: 'alki',
  storeOpen:6,
  storeClose:21,
  minCust: 2,
  maxCust: 16,
  avgCookiesPerCust: 4.6,
  hourlyCookies:[],
  custVolumeEst: function() {
    return (Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust));
  },
  calcHourlyCookiesEst: function() {
    for (var index = this.storeOpen; index <= this.storeClose; index++) {
      this.hourlyCookies.push(Math.round(this.custVolumeEst() * this.avgCookiesPerCust));
      console.log('loop ran');
    }
    return this.hourlyCookies;
  },
  calcDailyCookiesEst: function() {
    if (this.hourlyCookies.length > 0) {
      var dayTotal = this.hourlyCookies.reduce(function(a,b) {
        return a + b;
      });
      return dayTotal;
    } else {
      this.calcHourlyCookiesEst();
      var dayTotal = this.hourlyCookies.reduce(function(a,b) {
        return a + b;
      });
      return dayTotal;
    }
  }
};

// Runs object methods
var calculateValues = function(store) {
  store.calcDailyCookiesEst();
};

calculateValues(firstAndPike);
calculateValues(seaTac);
calculateValues(seattleCenter);
calculateValues(capHill);
calculateValues(alki);

// Populates cookie sales content - first and pike only!!
var populateContent = function(store) {
  var storeList = document.getElementById(store.storeId);
  for (var i = 0; i < store.hourlyCookies.length; i++) {
    var listElement = document.createElement('li');
    listElement.textContent = (i + 6) + ' o\'clock: ' + store.hourlyCookies[i] + ' cookies';
    storeList.appendChild(listElement);
  }
};

populateContent(firstAndPike);
populateContent(seaTac);
populateContent(seattleCenter);
populateContent(capHill);
populateContent(alki);
