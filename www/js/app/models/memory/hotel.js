define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        hotels = [
            {"id": 1, "name": "Hotel Fenice Milano", "cityId": 1, "cityZone": "Porta Venezia", "stars": 3, "lowestPrice": "€ 85", "img": "http://hotels.cdn-venere.com/hotels/1000000/530000/521300/521294/521294_34_b.jpg"},
            {"id": 2, "name": "Hotel Villa San Carlo Borromeo", "cityId": 1, "cityZone": "Nuova Fiera Milano", "stars": 5, "lowestPrice": "€ 140", "img": "http://hotels.cdn-venere.com/hotels/1000000/980000/970900/970885/970885_87_b.jpg"},
            {"id": 3, "name": "ADI Doria Grand Hotel", "cityId": 1, "cityZone": "Stazione Centrale", "stars": 4, "lowestPrice": "€ 69", "img": "http://hotels.cdn-venere.com/hotels/1000000/10000/5800/5726/5726_121_b.jpg"},

            //Data to be updated
            {"id": 11, "name": "Hotel Fenice Milano", "cityId": 2, "cityZone": "Porta Venezia", "stars": 3, "lowestPrice": "€ 85", "img": "http://hotels.cdn-venere.com/hotels/1000000/530000/521300/521294/521294_34_b.jpg"},
            {"id": 12, "name": "Hotel Villa San Carlo Borromeo", "cityId": 2, "cityZone": "Nuova Fiera Milano", "stars": 5, "lowestPrice": "€ 140", "img": "http://hotels.cdn-venere.com/hotels/1000000/980000/970900/970885/970885_87_b.jpg"},
            {"id": 13, "name": "ADI Doria Grand Hotel", "cityId": 2, "cityZone": "Stazione Centrale", "stars": 4, "lowestPrice": "€ 69", "img": "http://hotels.cdn-venere.com/hotels/1000000/10000/5800/5726/5726_121_b.jpg"},

            {"id": 21, "name": "Hotel Fenice Milano", "cityId": 3, "cityZone": "Porta Venezia", "stars": 3, "lowestPrice": "€ 85", "img": "http://hotels.cdn-venere.com/hotels/1000000/530000/521300/521294/521294_34_b.jpg"},
            {"id": 22, "name": "Hotel Villa San Carlo Borromeo", "cityId": 3, "cityZone": "Nuova Fiera Milano", "stars": 5, "lowestPrice": "€ 140", "img": "http://hotels.cdn-venere.com/hotels/1000000/980000/970900/970885/970885_87_b.jpg"},
            {"id": 23, "name": "ADI Doria Grand Hotel", "cityId": 3, "cityZone": "Stazione Centrale", "stars": 4, "lowestPrice": "€ 69", "img": "http://hotels.cdn-venere.com/hotels/1000000/10000/5800/5726/5726_121_b.jpg"},

            {"id": 31, "name": "Hotel Fenice Milano", "cityId": 4, "cityZone": "Porta Venezia", "stars": 3, "lowestPrice": "€ 85", "img": "http://hotels.cdn-venere.com/hotels/1000000/530000/521300/521294/521294_34_b.jpg"},
            {"id": 32, "name": "Hotel Villa San Carlo Borromeo", "cityId": 4, "cityZone": "Nuova Fiera Milano", "stars": 5, "lowestPrice": "€ 140", "img": "http://hotels.cdn-venere.com/hotels/1000000/980000/970900/970885/970885_87_b.jpg"},
            {"id": 43, "name": "ADI Doria Grand Hotel", "cityId": 4, "cityZone": "Stazione Centrale", "stars": 4, "lowestPrice": "€ 69", "img": "http://hotels.cdn-venere.com/hotels/1000000/10000/5800/5726/5726_121_b.jpg"},

            {"id": 41, "name": "Hotel Fenice Milano", "cityId": 5, "cityZone": "Porta Venezia", "stars": 3, "lowestPrice": "€ 85", "img": "http://hotels.cdn-venere.com/hotels/1000000/530000/521300/521294/521294_34_b.jpg"},
            {"id": 42, "name": "Hotel Villa San Carlo Borromeo", "cityId": 5, "cityZone": "Nuova Fiera Milano", "stars": 5, "lowestPrice": "€ 140", "img": "http://hotels.cdn-venere.com/hotels/1000000/980000/970900/970885/970885_87_b.jpg"},
            {"id": 43, "name": "ADI Doria Grand Hotel", "cityId": 5, "cityZone": "Stazione Centrale", "stars": 4, "lowestPrice": "€ 69", "img": "http://hotels.cdn-venere.com/hotels/1000000/10000/5800/5726/5726_121_b.jpg"},

            {"id": 51, "name": "Hotel Fenice Milano", "cityId": 6, "cityZone": "Porta Venezia", "stars": 3, "lowestPrice": "€ 85", "img": "http://hotels.cdn-venere.com/hotels/1000000/530000/521300/521294/521294_34_b.jpg"},
            {"id": 52, "name": "Hotel Villa San Carlo Borromeo", "cityId": 6, "cityZone": "Nuova Fiera Milano", "stars": 5, "lowestPrice": "€ 140", "img": "http://hotels.cdn-venere.com/hotels/1000000/980000/970900/970885/970885_87_b.jpg"},
            {"id": 53, "name": "ADI Doria Grand Hotel", "cityId": 6, "cityZone": "Stazione Centrale", "stars": 4, "lowestPrice": "€ 69", "img": "http://hotels.cdn-venere.com/hotels/1000000/10000/5800/5726/5726_121_b.jpg"}
        ],

        findById = function (id) {
            var deferred = $.Deferred(),
                hotel = null,
                l = hotels.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (hotels[i].id === id) {
                    hotel = hotels[i];
                    break;
                }
            }
            deferred.resolve(hotel);
            return deferred.promise();
        },

        findByName = function (searchKey) {
            var deferred = $.Deferred(),
                results = hotels.filter(function (element) {
                    var fullName = element.name; // + " " + element.lastName;
                    return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
                });
            deferred.resolve(results);
            return deferred.promise();
        },

        findByCity = function (cityId) {
            var deferred = $.Deferred(),
                results = hotels.filter(function (element) {
                    return cityId === element.cityId;
                });
            deferred.resolve(results);
            return deferred.promise();
        },


        Hotel = Backbone.Model.extend({

            initialize: function () {
            },

            sync: function (method, model, options) {
                if (method === "read") {
                    findById(parseInt(this.id)).done(function (data) {
                        options.success(data);
                    });
                }
            }

        }),

        HotelCollection = Backbone.Collection.extend({

            model: Hotel,

            sync: function (method, model, options) {
                if (method === "read") {
                    findByCity(options.data.cityID).done(function (data) {
                        options.success(data);
                    });
                }
            }

        });

    return {
        Hotel: Hotel,
        HotelCollection: HotelCollection
    };

});