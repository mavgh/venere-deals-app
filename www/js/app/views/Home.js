define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        Handlebars          = require('handlebars'),
        models              = require('app/models/theme'),
        tpl                 = require('text!tpl/Home.html'),

        template = Handlebars.compile(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.themeList = new models.ThemeCollection();
            this.themeList.fetch({reset: true, data: {}});
            this.render();
        },

        render: function () {
            this.$el.html(template({themes: this.themeList.toJSON()}));
            return this;
        },
    });

});