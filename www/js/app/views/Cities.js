define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        CityListView    = require('app/views/CityList'),
        tpl                 = require('text!tpl/Cities.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(template(this.model.attributes));
            this.model.cities.fetch();
            this.listView = new CityListView({collection: this.model.cities, el: $(".scroller", this.el)});
            return this;
        }

    });

});