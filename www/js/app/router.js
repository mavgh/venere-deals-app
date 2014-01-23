define(function (require) {

    "use strict";

    var $           = require('jquery'),
        _           = require('underscore'),
        Backbone    = require('backbone'),
        Handlebars  = require('handlebars'),
        PageSlider  = require('app/utils/pageslider'),
        HomeView    = require('app/views/Home'),
        dispatcher  = _.clone(Backbone.Events),
        theme,hotel,hotelCatalogue,

        slider = new PageSlider($('#wrapper')),
        
        startDate   = "";

    Handlebars.registerHelper('lookup', function(obj, field) {
        return obj[field];
    });

    Handlebars.registerHelper('if_even', function(conditional, options) {
      if((conditional % 2) === 0) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });    

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "theme/:id/:color": "themeDetails",
            "city/:id/hotels/:color": "hotels",
            "hotel/:id/:color": "hdp"
        },

        home: function () {
            console.log("Routing to 'home'");
            dispatcher.trigger( 'OnClose' );
            slider.slidePage(new HomeView({dispatcher:dispatcher}).$el);
        },

        themeDetails: function (id , color) {
            console.log("Routing to 'themeDetails'");
            require(["app/models/theme", "app/views/Cities"], function(models, CitiesView) {
                theme = new models.Theme({id: id, color: color});
                $.when(theme.fetch()).done(function() {
                    startDate = theme.attributes.start;
                    dispatcher.trigger('OnClose');
                    slider.slidePage(new CitiesView({model: theme, dispatcher: dispatcher}).$el);
                });
            });
        },
        
        hotels: function (id,color) {
            console.log("Routing to 'hotels'");
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
            console.log("Routing to 'hdp'");
            require(["app/models/hotel", "app/views/hdp"], function (models, hdpView) {
                hotel = new models.Hotel(); //hotel.fetch({data: { propertyID: id, startDate: startDate}}),
                hotelCatalogue = new models.HotelCatalogue(); //,hotelCatalogue.fetch({ data: { propertyID: id}})
                $.when(hotel.fetch({data: { propertyID: id, startDate: startDate}}), hotelCatalogue.fetch({ data: { propertyID: id}})).done(function() {
                    dispatcher.trigger( 'OnClose' );
                    slider.slidePage(new hdpView({model: hotel, catalogue:hotelCatalogue, startDate: startDate,color:color, dispatcher:dispatcher}).$el);
                });
            });
        }

    });

});