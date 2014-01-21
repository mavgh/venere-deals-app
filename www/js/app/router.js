define(function (require) {

    "use strict";

    var $           = require('jquery'),
        _           = require('underscore'),
        Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        HomeView    = require('app/views/Home'),
        dispatcher  = _.clone(Backbone.Events),

        slider = new PageSlider($('#wrapper')),
        
        startDate   = "",

        homeView = new HomeView({dispatcher:dispatcher});

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "theme/:id/:color": "themeDetails",
            "city/:id/hotels/:color": "hotels",
            "hotel/:id/:color": "hdp"
        },

        home: function () {
            homeView.delegateEvents();
            dispatcher.trigger( 'OnClose' );
            slider.slidePage(homeView.$el);
        },

        themeDetails: function (id , color) {
            require(["app/models/theme", "app/views/Cities"], function (models, CitiesView) {
                var theme = new models.Theme({id: id, color: color});
                
                theme.fetch({
                    success: function (data) {
                        startDate=data.attributes.start;
                        dispatcher.trigger( 'OnClose' );
                        slider.slidePage(new CitiesView({model: data, dispatcher:dispatcher}).$el);
                    }
                });
            });
        },
        
        hotels: function (id,color) {
            require(["app/models/city", "app/views/Hotels"], function (models, HotelsView) {
                var city = new models.City({id: id});
                city.fetch({
                    success: function (data) {
                        dispatcher.trigger( 'OnClose' );
                        slider.slidePage(new HotelsView({model: data, startDate: startDate,color:color, dispatcher:dispatcher}).$el);
                    }
                });
            });
        },
        
        hdp: function (id,color) {
            require(["app/models/hotel", "app/views/hdp"], function (models, hdpView) {
                var hotel = new models.Hotel();
                hotel.fetch({ data: { propertyID: id, startDate: startDate},
                    success: function (data) {
                        dispatcher.trigger( 'OnClose' );
                        slider.slidePage(new hdpView({model: data, startDate: startDate,color:color, dispatcher:dispatcher}).$el);
                    }
                });
            });
        }

    });

});