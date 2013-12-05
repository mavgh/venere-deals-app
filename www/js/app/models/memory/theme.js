define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        City                = require('app/models/city'),

        themes = [
            {"id": 1, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Rome-V1.jpg", "title": "Rome", "subtitle": "", "cityIDs": [1,2,3,4,5]},
            {"id": 2, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Rome-V1.jpg", "title": "Rome", "subtitle": "", "cityIDs": [5,6,7,8,9]},
            {"id": 3, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Rome-V1.jpg", "title": "Rome", "subtitle": "", "cityIDs": [1,2,3,4,5]},
            {"id": 4, "img": "http://img.venere.com/img/hotel-deals/Destination-Page/DP-S3-Rome-V1.jpg", "title": "Rome", "subtitle": "", "cityIDs": [1,2,3,4,5]}
            
            
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
        
        getCities=function (ids){
            var deferred = $.Deferred(),cities=[];
            for(i=0;i<ids.lenght;i++){
                
                cities.push(new City({id: ids[i]}));
            }
            deferred.resolve(cities);
            return deferred.promise();
        },

        Theme = Backbone.Model.extend({

            initialize: function () {
                this.cities = new CityCollection();
                
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

        }),
        
        CityCollection = Backbone.Collection.extend({

            model: City,

            sync: function (method, model, options) {
                if (method === "read") {
                    getCities(this.cityIDs).done(function (data) {
                        options.success(data);
                    });
                }
            }

        });

    return {
        Theme: Theme,
        ThemeCollection: ThemeCollection,
        CityCollection:CityCollection
    };

});