define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Handlebars          = require('handlebars'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/HotelList.html'),

        template = Handlebars.compile(tpl);

    return Backbone.View.extend({

        initialize: function () {
            $('<div class=loadingDiv>loading...</div>').prependTo(this.$el);
            this.collection.on("reset", this.render, this);
        },

        render: function () {
            this.$el.html(template({hotels: this.collection.toJSON()}));
            return this;
        }

    });

});