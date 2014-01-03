define(function (require) {

    "use strict";

    var $                = require('jquery'),
        Handlebars       = require('handlebars'),
        Backbone         = require('backbone'),
        model            = require('app/models/hotel'),
        tpl              = require('text!tpl/Hdp.html'),

        template = Handlebars.compile(tpl);

    return Backbone.View.extend({

        initialize: function (options) {
            this.render();
        },

        render: function () {
            console.log("hdp view - Rendering response:"+JSON.stringify(this.model.attributes.XHI_HotelAvailRS.AvailResults.AvailResult[0]));
            this.$el.html(template(this.model.attributes.XHI_HotelAvailRS.AvailResults.AvailResult[0]));
            return this;
        }

    });

});