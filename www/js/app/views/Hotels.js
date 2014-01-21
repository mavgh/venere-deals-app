define(function (require) {

    "use strict";

    var $                = require('jquery'),
        Handlebars       = require('handlebars'),
        Backbone         = require('backbone'),
        model            = require('app/models/hotel'),
        HotelListView    = require('app/views/HotelList'),
        tpl              = require('text!tpl/Hotels.html'),

        template = Handlebars.compile(tpl);

    return Backbone.View.extend({

        initialize: function (options) {
            this.hotels = new model.HotelCollection();
            this.color=options.color;
            this.dispatcher = options.dispatcher;
            this.dispatcher.on( 'OnClose', this.close, this );
            this.render();
            
            this.hotels.fetch({ reset:true, data: { geoID: this.model.attributes.geoID, startDate: options.startDate} });
        },
        close: function() {
            // Unregister for event to stop memory leak
            console.log("Closing Hotels");
            this.dispatcher.off('OnClose', this.close, this);
            this.remove();
            this.unbind();
            this.views = [];   // Clear the view array
        },
        render: function () {
            this.$el.html(template(this.model.attributes));
            this.listView = new HotelListView({collection: this.hotels,color:this.color, dispatcher:this.dispatcher, el: $(".scroller", this.el)});
            return this;
        }

    });

});