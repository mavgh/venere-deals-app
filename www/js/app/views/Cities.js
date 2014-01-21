define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        Handlebars          = require('handlebars'),
        models              = require('app/models/city'),
        tpl                 = require('text!tpl/Cities.html'),

        template = Handlebars.compile(tpl);

    return Backbone.View.extend({

        initialize: function (options) {
            this.citiesList = new models.CityCollection();
            this.citiesList.fetch({data:{cityIDs: this.model.attributes.cityIDs}});
            this.dispatcher = options.dispatcher;
            this.dispatcher.on( 'OnClose', this.close, this );
            this.render();
        },
        close: function() {
            // Unregister for event to stop memory leak
            console.log("Closing Cities");
            this.dispatcher.off('OnClose', this.close, this);
            this.remove();
            this.unbind();
            this.views = [];   // Clear the view array
        },
        render: function () {
            this.$el.html(template({title: this.model.attributes.title, subtitle: this.model.attributes.subtitle, img: this.model.attributes.img, cities: this.citiesList.toJSON(), color: this.model.attributes.color}));
            return this;
        }

    });

});