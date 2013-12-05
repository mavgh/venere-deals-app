define(function (require) {

    "use strict";

    var $        = require('jquery'),
        Backbone = require('backbone'),

        cities = [
            {"id": 1, "name": "Milan", "description": "", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Milan-V1.jpg"},
            {"id": 2, "name": "Paris", "description": "", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Paris-V1.jpg"},
            {"id": 3, "name": "Hong Kong", "description": "", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Hong-Kong-V1.jpg"},
            {"id": 4, "name": "Berlin", "description": "", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S2-Berlin-V1.jpg"},
            {"id": 5, "name": "London", "description": "", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S2-London-V1.jpg"},
            {"id": 6, "name": "Rome", "description": "", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Rome-V1.jpg"},
            {"id": 7, "name": "New York", "description": "", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-NewYork-V1.jpg"},
            {"id": 8, "name": "Prague", "description": "", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S2-Prague-V2.jpg"},
            {"id": 9, "name": "Madrid", "description": "", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S2-Madrid-V1.jpg"},
            {"id": 10, "name": "Munich", "description": "", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Munich-V1.jpg"},
            {"id": 11, "name": "Dubai", "description": "", "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Dubai-V1.jpg"}
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