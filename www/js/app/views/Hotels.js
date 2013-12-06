define(function (require) {

    "use strict";

    var $                = require('jquery'),
        _                = require('underscore'),
        Backbone         = require('backbone'),
        model            = require('app/models/hotel'),
        HotelListView    = require('app/views/HotelList'),
        tpl              = require('text!tpl/Hotels.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.hotels = new model.HotelCollection();
            this.hotels.fetch({ data: { cityID: this.model.attributes.id} });
            this.render();
        },

        render: function () {
            this.$el.html(template(this.model.attributes));
            this.listView = new HotelListView({collection: this.hotels, el: $(".scroller", this.el)});
            return this;
        }

    });

});