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

            //replace small thumbnail with bigh thumb
            var availResult = this.model.attributes.XHI_HotelAvailRS.AvailResults.AvailResult[0];
            var photoURL = availResult.PropertyDetails.photoURL;
            var bigPhotoURL = photoURL.replace('.jpg','_b.jpg');
            availResult.PropertyDetails.photoURL = bigPhotoURL;
            
            this.$el.html(template(this.model.attributes.XHI_HotelAvailRS.AvailResults.AvailResult[0]));
            return this;
        }

    });

});