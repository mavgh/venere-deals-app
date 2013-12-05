define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        Handlebars          = require('handlebars'),
        models              = require('app/models/city'),
        tpl                 = require('text!tpl/Cities.html'),

        template = Handlebars.compile(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.citiesList = new models.CityCollection();
            this.citiesList.fetch({data:{cityIDs: this.model.attributes.cityIDs}});
            this.render();
        },

        render: function () {
            this.$el.html(template({title: this.model.attributes.title, subtitle: this.model.attributes.subtitle, img: this.model.attributes.img, cities: this.citiesList.toJSON()}));
            return this;
        }

    });

});