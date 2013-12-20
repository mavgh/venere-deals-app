define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        City                = require('app/models/city'),

        themes = [
            {"id": 1, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Rome-V1.jpg", "title": "Winter Sale", "subtitle": "From 06-01-14 to 20-01-14", "start": "2014-01-06", "cityIDs": [1,2,3,4,5]},
            {"id": 2, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Rome-V1.jpg", "title": "Christmas Shopping Deals", "subtitle": "From 23-12-13 to 20-01-14", "start": "2013-12-23", "cityIDs": [6,7,8,9,10]},
            {"id": 3, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Rome-V1.jpg", "title": "Great value properties", "subtitle": "From 21-12-13 to 20-01-14", "start": "2013-12-21", "cityIDs": [11,9,7,5,3,1]},
            {"id": 4, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Rome-V1.jpg", "title": "Offers for New Year", "subtitle": "From 01-01-14 to 20-01-14", "start": "2014-01-01", "cityIDs": [10,8,6,4,2]}
            
            
        ],

        findById = function (id) {
            var deferred = $.Deferred(),
                theme = null,
                l = themes.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (themes[i].id === id) {
                    theme = themes[i];
                    break;
                }
            }
            deferred.resolve(theme);
            return deferred.promise();
        },

        findAll = function () {
            var deferred = $.Deferred(),
            results = themes;
            deferred.resolve(results);
            return deferred.promise();
        },

        Theme = Backbone.Model.extend({

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

        ThemeCollection = Backbone.Collection.extend({

            model: Theme,

            sync: function (method, model, options) {
                if (method === "read") {
                    findAll().done(function (data) {
                        options.success(data);
                    });
                }
            }

        });

    return {
        Theme: Theme,
        ThemeCollection: ThemeCollection
    };

});