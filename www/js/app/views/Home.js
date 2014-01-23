define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        Handlebars          = require('handlebars'),
        models              = require('app/models/theme'),
        tpl                 = require('text!tpl/Home.html'),
        template = Handlebars.compile(tpl);
        
    return Backbone.View.extend({

        initialize: function (options) {
            this.themeList = new models.ThemeCollection();
            this.themeList.fetch({reset: true, data: {}});
            this.dispatcher = options.dispatcher;
            this.dispatcher.on( 'OnClose', this.close, this );
            this.render();
        },
        render: function () {
            this.$el.html(template({themes: this.themeList.toJSON()}));
            return this;
        },
        close: function() {
            // Unregister for event to stop memory leak
            console.log("Closing Home");
            this.dispatcher.off('OnClose', this.close, this);
            this.remove();
            this.unbind();
            this.views = [];   // Clear the view array
        }
    });

});
