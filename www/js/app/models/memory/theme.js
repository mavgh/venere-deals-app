define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        City                = require('app/models/city'),

        themes = [
            {"id": 1, "color":"purple", "img": "http://timoelliott.com/personal/wp-content/uploads/2009/09/eiffel-fireworks.jpg", "title": "New Year Holte Deals", "subtitle": "Where will you enjoy the count down to 2014? From beach vacations to urban gateways, here are some tempting travel offers to ring in 2014 in style.", "start": "2014-02-06", "cityIDs": [1,2,3,4,5]},
            {"id": 2, "color":"red",    "img": "http://www.coastandcountryfrance.com/property_news/wp-content/uploads/Vienna-Christmas-Market-decorations.jpg", "title": "Christmas Markets", "subtitle": "Mix travel and shopping this Christmas! Find the perfect gifts at the magical Christmas markets of Europe. Or shop til you drop in London, Paris, New York...", "start": "2014-02-23", "cityIDs": [6,7,8,9,10]},
            {"id": 3, "color":"gold",   "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Rome-V1.jpg", "title": "Christmas Shopping Deals", "subtitle": "Mix travel and shopping this Christmas! Find the perfect gifts at the magical Christmas markets of Europe. Or shop til you drop in London, Paris, New York...", "start": "2014-02-21", "cityIDs": [11,9,7,5,3,1]},
            {"id": 4, "color":"azure",  "img": "http://i.telegraph.co.uk/multimedia/archive/01125/paris-lights_1125441c.jpg", "title": "Winter Sale", "subtitle": "Mix travel and shopping this Christmas! Find the perfect gifts at the magical Christmas markets of Europe. Or shop til you drop in London, Paris, New York...", "start": "2014-02-01", "cityIDs": [10,8,6,4,2]},
            {"id": 5, "color":"green",  "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Rome-V1.jpg", "title": "Offers for New Year", "subtitle": "Mix travel and shopping this Christmas! Find the perfect gifts at the magical Christmas markets of Europe. Or shop til you drop in London, Paris, New York...", "start": "2014-02-01", "cityIDs": [10,8,6,4,2]},
            {"id": 6, "color":"orange",  "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Rome-V1.jpg", "title": "Offers for New Year", "subtitle": "Mix travel and shopping this Christmas! Find the perfect gifts at the magical Christmas markets of Europe. Or shop til you drop in London, Paris, New York...", "start": "2014-02-01", "cityIDs": [10,8,6,4,2]}
            
            
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