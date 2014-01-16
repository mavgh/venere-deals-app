define(function (require) {

    "use strict";

    var $        = require('jquery'),
        Backbone = require('backbone'),

        cities = [
            {"id": 1, "geoID": "303",     "name": "Milan",     "price": "from", "amount": "€ 50", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Milan-V1.jpg"},
            {"id": 2, "geoID": "5285",    "name": "Paris",     "price": "from", "amount": "€ 50", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Paris-V1.jpg"},
            {"id": 3, "geoID": "558106",  "name": "Hong Kong", "price": "from", "amount": "€ 50", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Hong-Kong-V1.jpg"},
            {"id": 4, "geoID": "5219",    "name": "Berlin",    "price": "from", "amount": "€ 50", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S2-Berlin-V1.jpg"},
            {"id": 5, "geoID": "1509",    "name": "London",    "price": "from", "amount": "€ 50", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S2-London-V1.jpg"},
            {"id": 6, "geoID": "3425",    "name": "Rome",      "price": "from", "amount": "€ 50", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Rome-V1.jpg"},
            {"id": 7, "geoID": "41437",   "name": "New York",  "price": "from", "amount": "€ 50", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-NewYork-V1.jpg"},
            {"id": 8, "geoID": "43505",   "name": "Prague",    "price": "from", "amount": "€ 50", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S2-Prague-V2.jpg"},
            {"id": 9, "geoID": "1611",    "name": "Madrid",    "price": "from", "amount": "€ 50", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S2-Madrid-V1.jpg"},
            {"id": 10, "geoID": "43469",  "name": "Munich",    "price": "from", "amount": "€ 50", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Munich-V1.jpg"},
            {"id": 11, "geoID": "562486", "name": "Dubai",     "price": "from", "amount": "€ 50", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Dubai-V1.jpg"}
        ],

        findById = function (id) {
            var deferred = $.Deferred(),
                city = null,
                l = cities.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (cities[i].id === id) {
                    city = cities[i];
                    break;
                }
            }
            deferred.resolve(city);
            return deferred.promise();
        },
        
        findByIDs = function (ids) {
            var deferred = $.Deferred(),
            results = cities.filter(function(element) {
                var isFound = false;
                for (var i = 0; i < ids.length; i++) {
                    if (element.id === ids[i]) {
                        isFound = true;
                        break;
                    }
                }
                return isFound;
            });
            deferred.resolve(results);
            return deferred.promise();
        },

        City = Backbone.Model.extend({

            sync: function (method, model, options) {
                if (method === "read") {
                    findById(parseInt(this.id)).done(function (data) {
                        options.success(data);
                    });
                }
            }

        }),
        
        CityCollection = Backbone.Collection.extend({

            model: City,

            sync: function (method, model, options) {
                if (method === "read") {
                    findByIDs(options.data.cityIDs).done(function (data) {
                        options.success(data);
                    });
                }
            }

        });

    return {
        City: City,
        CityCollection: CityCollection
    };

});