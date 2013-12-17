define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        Handlebars          = require('handlebars'),
        models              = require('app/models/theme'),
        tpl_pt              = require('text!tpl/Home.html'),
        tpl_ls              = require('text!tpl/Home_ls.html'),

        template_pt = Handlebars.compile(tpl_pt),
        template_ls = Handlebars.compile(tpl_ls),
        template, view;

        Handlebars.registerHelper('if_even', function(conditional, options) {
          if((conditional % 2) === 0) {
            return options.fn(this);
          } else {
            return options.inverse(this);
          }
        });    
        
    return Backbone.View.extend({

        initialize: function () {
            var supportsOrientationChange = "onorientationchange" in window,
                orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
            window.addEventListener(orientationEvent, this.checkOrientationAndRender, false);
//            $(window).on("resize", this.doOnOrientationChange);
            this.themeList = new models.ThemeCollection();
            this.themeList.fetch({reset: true, data: {}});
            view = this;
            this.checkOrientationAndRender();
        },

        render: function () {
            this.$el.html(template({themes: this.themeList.toJSON()}));
            return this;
        },
        
        checkOrientationAndRender: function(event) {
            if (window.orientation) {
                if (window.orientation === -90 || window.orientation === 90) {
                    template = template_ls;
                } else {
                    template = template_pt;
                }
            } else {
                if (window.innerWidth > window.InnerHeight) {
                    template = template_ls;
                } else {
                    template = template_pt;
                }
            }
            view.render();
        }
    });

});