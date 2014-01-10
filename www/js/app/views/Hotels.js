define(function (require) {

    "use strict";

    var $                = require('jquery'),
        Handlebars       = require('handlebars'),
        Backbone         = require('backbone'),
        model            = require('app/models/hotel'),
        HotelListView    = require('app/views/HotelList'),
        tpl              = require('text!tpl/Hotels.html'),

        template = Handlebars.compile(tpl);

    return Backbone.View.extend({

        initialize: function (options) {
            this.hotels = new model.HotelCollection();
            this.color=options.color;
            this.render();
            
            this.hotels.fetch({ reset:true, data: { geoID: this.model.attributes.geoID, startDate: options.startDate} });
        },

        render: function () {
            this.$el.html(template(this.model.attributes));
            this.listView = new HotelListView({collection: this.hotels,color:this.color, el: $(".scroller", this.el)});
            return this;
        }

    });

});