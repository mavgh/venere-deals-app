define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        HomeView    = require('app/views/Home'),

        slider = new PageSlider($('#wrapper')),
        
        startDate   = "",

        homeView = new HomeView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "theme/:id": "themeDetails",
            "city/:id/hotels": "hotels"
        },

        home: function () {
            homeView.delegateEvents();
            slider.slidePage(homeView.$el);
        },

        themeDetails: function (id) {
            require(["app/models/theme", "app/views/Cities"], function (models, CitiesView) {
                var theme = new models.Theme({id: id});
                
                theme.fetch({
                    success: function (data) {
                        startDate=data.attributes.start;
                        slider.slidePage(new CitiesView({model: data}).$el);
                    }
                });
            });
        },
        
        hotels: function (id) {
            require(["app/models/city", "app/views/Hotels"], function (models, HotelsView) {
                var city = new models.City({id: id});
                city.fetch({
                    success: function (data) {
                        slider.slidePage(new HotelsView({model: data, startDate: startDate}).$el);
                    }
                });
            });
        }

    });

});