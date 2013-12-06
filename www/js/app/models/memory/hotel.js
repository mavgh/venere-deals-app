define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        hotels = [
            {"id": 1, "name": "Hotel Fenice Milano", "cityId": 1, "cityZone": "Porta Venezia", "stars": 3, "lowestPrice": "€ 85", "img": "http://hotels.cdn-venere.com/hotels/1000000/530000/521300/521294/521294_34_b.jpg"},
            {"id": 2, "name": "Hotel Villa San Carlo Borromeo", "cityId": 1, "cityZone": "Nuova Fiera Milano", "stars": 5, "lowestPrice": "€ 140", "img": "http://hotels.cdn-venere.com/hotels/1000000/980000/970900/970885/970885_87_b.jpg"},
            {"id": 3, "name": "ADI Doria Grand Hotel", "cityId": 1, "cityZone": "Stazione Centrale", "stars": 4, "lowestPrice": "€ 69", "img": "http://hotels.cdn-venere.com/hotels/1000000/10000/5800/5726/5726_121_b.jpg"},
            {"id": 4, "name": "Best Western Hotel Goldenmile", "cityId": 1, "cityZone": "Trezzano sul Naviglio", "stars": 4, "lowestPrice": "€ 54", "img": "http://hotels.cdn-venere.com/hotels/2000000/1750000/1742800/1742798/1742798_33_b.jpg"},
            {"id": 5, "name": "Residence Pian Della Nave", "cityId": 1, "cityZone": "Città Studi", "stars": 3, "lowestPrice": "€ 63", "img": "http://hotels.cdn-venere.com/hotels/7000000/6280000/6278800/6278782/6278782_16_b.jpg"},
            {"id": 6, "name": "Due Giardini", "cityId": 1, "cityZone": "Stazione Centrale", "stars": 2, "lowestPrice": "€ 49", "img": "http://hotels.cdn-venere.com/hotels/3000000/2530000/2523000/2522962/2522962_8_b.jpg"},

            {"id": 11, "name": "Hotel Moulin Vert", "cityId": 2, "cityZone": "Gare Montparnasse", "stars": 2, "lowestPrice": "€ 48", "img": "http://hotels.cdn-venere.com/hotels/1000000/40000/34300/34206/34206_71_b.jpg"},
            {"id": 12, "name": "Hotel Prince Albert Wagram", "cityId": 2, "cityZone": "Arc de Triomphe", "stars": 2, "lowestPrice": "€ 50", "img": "http://hotels.cdn-venere.com/hotels/2000000/1420000/1417400/1417342/1417342_44_b.jpg"},
            {"id": 13, "name": "Hotel Le Canal", "cityId": 2, "cityZone": "Buttes Chaumont - La Villette", "stars": 3, "lowestPrice": "€ 59", "img": "http://hotels.cdn-venere.com/hotels/4000000/3750000/3748600/3748528/3748528_42_b.jpg"},

            {"id": 21, "name": "Regal Riverside Hotel", "cityId": 3, "cityZone": "Sha Tin", "stars": 4, "lowestPrice": "€ 47", "img": "http://hotels.cdn-venere.com/hotels/1000000/20000/10400/10382/10382_72_b.jpg"},
            {"id": 22, "name": "Silka West Kowloon Hotel", "cityId": 3, "cityZone": "Kowloon", "stars": 3, "lowestPrice": "€ 49", "img": "http://hotels.cdn-venere.com/hotels/2000000/1200000/1196200/1196187/1196187_23_b.jpg"},
            {"id": 23, "name": "Harbour Plaza Resort City", "cityId": 3, "cityZone": "Tin Shui Wai", "stars": 4, "lowestPrice": "€ 58", "img": "http://hotels.cdn-venere.com/hotels/1000000/480000/470500/470478/470478_49_b.jpg"},

            //Data to be updated
            {"id": 31, "name": "Hotel Fenice", "cityId": 4, "cityZone": "Porta Venezia", "stars": 3, "lowestPrice": "€ 85", "img": "http://hotels.cdn-venere.com/hotels/1000000/530000/521300/521294/521294_34_b.jpg"},
            {"id": 32, "name": "Hotel Moulin Vert", "cityId": 4, "cityZone": "Gare Montparnasse", "stars": 2, "lowestPrice": "€ 48", "img": "http://hotels.cdn-venere.com/hotels/1000000/40000/34300/34206/34206_71_b.jpg"},
            {"id": 33, "name": "Hotel Prince Albert Wagram", "cityId": 4, "cityZone": "Arc de Triomphe", "stars": 2, "lowestPrice": "€ 50", "img": "http://hotels.cdn-venere.com/hotels/2000000/1420000/1417400/1417342/1417342_44_b.jpg"},
            {"id": 34, "name": "Hotel Le Canal", "cityId": 4, "cityZone": "Buttes Chaumont - La Villette", "stars": 3, "lowestPrice": "€ 59", "img": "http://hotels.cdn-venere.com/hotels/4000000/3750000/3748600/3748528/3748528_42_b.jpg"},
            {"id": 35, "name": "Hotel Villa San Carlo Borromeo", "cityId": 4, "cityZone": "Nuova Fiera", "stars": 5, "lowestPrice": "€ 140", "img": "http://hotels.cdn-venere.com/hotels/1000000/980000/970900/970885/970885_87_b.jpg"},
            {"id": 36, "name": "ADI Doria Grand Hotel", "cityId": 4, "cityZone": "Stazione Centrale", "stars": 4, "lowestPrice": "€ 69", "img": "http://hotels.cdn-venere.com/hotels/1000000/10000/5800/5726/5726_121_b.jpg"},

            {"id": 41, "name": "DEMO Hotel Fenice", "cityId": 5, "cityZone": "Porta Venezia", "stars": 3, "lowestPrice": "€ 85", "img": "http://hotels.cdn-venere.com/hotels/1000000/530000/521300/521294/521294_34_b.jpg"},
            {"id": 42, "name": "DEMO Hotel Villa San Carlo Borromeo", "cityId": 5, "cityZone": "Nuova Fiera", "stars": 5, "lowestPrice": "€ 140", "img": "http://hotels.cdn-venere.com/hotels/1000000/980000/970900/970885/970885_87_b.jpg"},
            {"id": 43, "name": "DEMO ADI Doria Grand Hotel", "cityId": 5, "cityZone": "Stazione Centrale", "stars": 4, "lowestPrice": "€ 69", "img": "http://hotels.cdn-venere.com/hotels/1000000/10000/5800/5726/5726_121_b.jpg"},

            {"id": 51, "name": "DEMO Hotel Fenice", "cityId": 6, "cityZone": "Porta Venezia", "stars": 3, "lowestPrice": "€ 85", "img": "http://hotels.cdn-venere.com/hotels/1000000/530000/521300/521294/521294_34_b.jpg"},
            {"id": 52, "name": "DEMO Hotel Villa San Carlo Borromeo", "cityId": 6, "cityZone": "Nuova Fiera", "stars": 5, "lowestPrice": "€ 140", "img": "http://hotels.cdn-venere.com/hotels/1000000/980000/970900/970885/970885_87_b.jpg"},
            {"id": 53, "name": "DEMO ADI Doria Grand Hotel", "cityId": 6, "cityZone": "Stazione Centrale", "stars": 4, "lowestPrice": "€ 69", "img": "http://hotels.cdn-venere.com/hotels/1000000/10000/5800/5726/5726_121_b.jpg"},

            {"id": 61, "name": "DEMO Regal Riverside Hotel", "cityId": 7, "cityZone": "Sha Tin", "stars": 4, "lowestPrice": "€ 47", "img": "http://hotels.cdn-venere.com/hotels/1000000/20000/10400/10382/10382_72_b.jpg"},
            {"id": 62, "name": "DEMO Silka West Kowloon Hotel", "cityId": 7, "cityZone": "Kowloon", "stars": 3, "lowestPrice": "€ 49", "img": "http://hotels.cdn-venere.com/hotels/2000000/1200000/1196200/1196187/1196187_23_b.jpg"},
            {"id": 63, "name": "DEMO Hotel Moulin Vert", "cityId": 7, "cityZone": "Gare Montparnasse", "stars": 2, "lowestPrice": "€ 48", "img": "http://hotels.cdn-venere.com/hotels/1000000/40000/34300/34206/34206_71_b.jpg"},
            {"id": 64, "name": "DEMO Hotel Prince Albert Wagram", "cityId": 7, "cityZone": "Arc de Triomphe", "stars": 2, "lowestPrice": "€ 50", "img": "http://hotels.cdn-venere.com/hotels/2000000/1420000/1417400/1417342/1417342_44_b.jpg"},
            {"id": 65, "name": "DEMO Hotel Le Canal", "cityId": 7, "cityZone": "Buttes Chaumont - La Villette", "stars": 3, "lowestPrice": "€ 59", "img": "http://hotels.cdn-venere.com/hotels/4000000/3750000/3748600/3748528/3748528_42_b.jpg"},
            {"id": 66, "name": "DEMO Harbour Plaza Resort City", "cityId": 7, "cityZone": "Tin Shui Wai", "stars": 4, "lowestPrice": "€ 58", "img": "http://hotels.cdn-venere.com/hotels/1000000/480000/470500/470478/470478_49_b.jpg"},

            {"id": 71, "name": "DEMO Hotel Prince Albert Wagram", "cityId": 8, "cityZone": "Arc de Triomphe", "stars": 2, "lowestPrice": "€ 50", "img": "http://hotels.cdn-venere.com/hotels/2000000/1420000/1417400/1417342/1417342_44_b.jpg"},
            {"id": 72, "name": "DEMO Hotel Le Canal", "cityId": 8, "cityZone": "Buttes Chaumont - La Villette", "stars": 3, "lowestPrice": "€ 59", "img": "http://hotels.cdn-venere.com/hotels/4000000/3750000/3748600/3748528/3748528_42_b.jpg"},
            {"id": 73, "name": "DEMO Harbour Plaza Resort City", "cityId": 8, "cityZone": "Tin Shui Wai", "stars": 4, "lowestPrice": "€ 58", "img": "http://hotels.cdn-venere.com/hotels/1000000/480000/470500/470478/470478_49_b.jpg"},

            {"id": 81, "name": "DEMO Hotel Le Canal", "cityId": 9, "cityZone": "Buttes Chaumont - La Villette", "stars": 3, "lowestPrice": "€ 59", "img": "http://hotels.cdn-venere.com/hotels/4000000/3750000/3748600/3748528/3748528_42_b.jpg"},
            {"id": 82, "name": "DEMO Hotel Villa San Carlo Borromeo", "cityId": 9, "cityZone": "Nuova Fiera", "stars": 5, "lowestPrice": "€ 140", "img": "http://hotels.cdn-venere.com/hotels/1000000/980000/970900/970885/970885_87_b.jpg"},
            {"id": 83, "name": "DEMO ADI Doria Grand Hotel", "cityId": 9, "cityZone": "Stazione Centrale", "stars": 4, "lowestPrice": "€ 69", "img": "http://hotels.cdn-venere.com/hotels/1000000/10000/5800/5726/5726_121_b.jpg"},

            {"id": 91, "name": "Hotel Prince Albert Wagram", "cityId": 10, "cityZone": "Arc de Triomphe", "stars": 2, "lowestPrice": "€ 50", "img": "http://hotels.cdn-venere.com/hotels/2000000/1420000/1417400/1417342/1417342_44_b.jpg"},
            {"id": 92, "name": "Hotel Le Canal", "cityId": 10, "cityZone": "Buttes Chaumont - La Villette", "stars": 3, "lowestPrice": "€ 59", "img": "http://hotels.cdn-venere.com/hotels/4000000/3750000/3748600/3748528/3748528_42_b.jpg"},
            {"id": 93, "name": "Hotel Villa San Carlo Borromeo", "cityId": 10, "cityZone": "Nuova Fiera", "stars": 5, "lowestPrice": "€ 140", "img": "http://hotels.cdn-venere.com/hotels/1000000/980000/970900/970885/970885_87_b.jpg"},

            {"id": 101, "name": "DEMO Silka West Kowloon Hotel", "cityId": 11, "cityZone": "Kowloon", "stars": 3, "lowestPrice": "€ 49", "img": "http://hotels.cdn-venere.com/hotels/2000000/1200000/1196200/1196187/1196187_23_b.jpg"},
            {"id": 102, "name": "DEMO Hotel Moulin Vert", "cityId": 11, "cityZone": "Gare Montparnasse", "stars": 2, "lowestPrice": "€ 48", "img": "http://hotels.cdn-venere.com/hotels/1000000/40000/34300/34206/34206_71_b.jpg"},
            {"id": 103, "name": "DEMO Hotel Prince Albert Wagram", "cityId": 11, "cityZone": "Arc de Triomphe", "stars": 2, "lowestPrice": "€ 50", "img": "http://hotels.cdn-venere.com/hotels/2000000/1420000/1417400/1417342/1417342_44_b.jpg"},
            {"id": 104, "name": "DEMO Hotel Le Canal", "cityId": 11, "cityZone": "Buttes Chaumont - La Villette", "stars": 3, "lowestPrice": "€ 59", "img": "http://hotels.cdn-venere.com/hotels/4000000/3750000/3748600/3748528/3748528_42_b.jpg"}
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