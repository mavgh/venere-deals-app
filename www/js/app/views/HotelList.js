define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Handlebars          = require('handlebars'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/HotelList.html'),

        template = Handlebars.compile(tpl);

    return Backbone.View.extend({

        initialize: function (options) {
           /**
            * Replace dummy content with correct call to template data
            **/
           var html = [];
           
           this.color=options.color;
           
           var hotelData = {
              image   : 'http://www.mensfitness.com/sites/mensfitness.com/files/imagecache/node_page_image/blog_images/dirty-hotel_main.jpg',
              original: '73€',
              discount: '47€',
              name    : 'Hotel & Apartments Klimt',
              stars   : '3',
              dealInfo: 'Stay 4 night and save 25% off your stay! (from 5th January)'
           }
           
           var hotelTpl = [
              '<a class="hotel-card clearFix" href="#">',
                 '<div class="hotel-pic" style="background-image:url('+hotelData.image+');">',
                    '<div class="hotel-price">',
                       '<span class="hotel-price-original">'+hotelData.original+'</span>',
                       '<span class="hotel-price-discount">'+hotelData.discount+'</span>',
                    '</div>',
                 '</div>',
                 '<div class="hotel-info">',
                    '<p class="hotel-name"><span class="name">'+hotelData.name+'</span><span class="vicons-star stars_'+hotelData.stars+'">&nbsp;</span></p>',
                    '<div class="hotel-dealInfo vicons-labelhollow"><span class="tableFix"><span class="tb"><span class="tc">'+hotelData.dealInfo+'</span></span></span></div>',
                 '</div>',                 
              '</a>'
           ].join('\n')
           
           for ( var i=0; i<10; i++) {
              html.push(hotelTpl);
           }
           
            $( html.join('\n') ).prependTo(this.$el);
            this.collection.on("reset", this.render, this);
        },

        render: function () {
            this.$el.html(template({hotels: this.collection.toJSON(),color:this.color}));
            return this;
        }

    });

});