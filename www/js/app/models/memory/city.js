define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        cities = [
            {"id": 1, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Rome-V1.jpg", "name": "Rome", "description": "", "hotelIDs": [1,2,3,4,5]},
            {"id": 2, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Paris-V1.jpg", "name": "Paris", "description": "", "hotelIDs": [5,6,7,8,9]},
            {"id": 3, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Hong-Kong-V1.jpg", "name": "Hong Kong", "description": "", "hotelIDs": [10,11,12,13,14]},
            {"id": 4, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S2-Berlin-V1.jpg", "name": "Berlin", "description": "", "hotelIDs": [15,16,17,18,19]},
            {"id": 5, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S2-London-V1.jpg", "name": "London", "description": "", "hotelIDs": [20,21,22,23,24,25]},
            {"id": 6, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Milan-V1.jpg", "name": "Milan", "description": "", "hotelIDs": [1,2,3,4,5]},
            {"id": 7, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-NewYork-V1.jpg", "name": "New York", "description": "", "hotelIDs": [1,2,3,4,5]},
            {"id": 8, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S2-Prague-V2.jpg", "name": "Prague", "description": "", "hotelIDs": [1,2,3,4,5]},
            {"id": 9, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S2-Madrid-V1.jpg", "name": "Madrid", "description": "", "hotelIDs": [1,2,3,4,5]},
            {"id": 10, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Munich-V1.jpg", "name": "Munich", "description": "", "hotelIDs": [1,2,3,4,5]},
            {"id": 12, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Dubai-V1.jpg", "name": "Dubai", "description": "", "hotelIDs": [1,2,3,4,5]},
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
        
        findByIDs=function (ids){
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