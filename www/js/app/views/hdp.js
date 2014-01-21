define(function (require) {

    "use strict";

    var $                = require('jquery'),
        Handlebars       = require('handlebars'),
        Backbone         = require('backbone'),
        model            = require('app/models/hotel'),
        tpl              = require('text!tpl/Hdp.html'),
        map = null, view=null, propertyOnMap = null, color,
        template = Handlebars.compile(tpl);

    return Backbone.View.extend({

        initialize: function (options) {
            view = this;
            map = null;
            color = options.color;
            this.render();
            setTimeout(this.initializeMap,100);
        },

        render: function () {
//            console.log("hdp view - Rendering response:"+JSON.stringify(this.model.attributes.XHI_HotelAvailRS.AvailResults.AvailResult[0]));

            //replace small thumbnail with bigh thumb
            var availResult = this.model.attributes.XHI_HotelAvailRS.AvailResults.AvailResult[0];
            var photoURL = availResult.PropertyDetails.photoURL;
            var bigPhotoURL = photoURL.replace('.jpg','_b.jpg');
            availResult.PropertyDetails.photoURL = bigPhotoURL;
            console.log(availResult);
            
            
            this.$el.html(template({detail: availResult, color: color}));
            return this;
        },
        initializeMap: function() {
            view.getPropertyCoords();
            var mapStyles = [{
                    featureType: "poi.business",
                    elementType: "all", // all, labels
                    stylers: [{visibility: "off"}]
                }];
            var myOptions = {
                center: propertyOnMap.position, //new google.maps.LatLng(-34.397, 150.644),
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scaleControl: true,
                styles: mapStyles,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                },
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.ZOOM_PAN
                },
                scrollwheel: false
            };
            map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
//            map.fitBounds(propertyOnMap.bounds);
            view.initMarkers();
        },
        getPropertyCoords: function() {
            var bounds = new google.maps.LatLngBounds();
            propertyOnMap = new Object();
            propertyOnMap = view.model.attributes.XHI_HotelAvailRS.AvailResults.AvailResult[0].PropertyDetails;
            propertyOnMap.position = new google.maps.LatLng(propertyOnMap.latitude, propertyOnMap.longitude);
            bounds.extend(propertyOnMap.position);
            propertyOnMap.bounds = bounds;
        },
        initMarkers: function() {
            if (propertyOnMap.position) {
                var marker = new google.maps.Marker({
                    position: propertyOnMap.position,
                    map: map
                });
                marker.setTitle(propertyOnMap.name);
                marker.setIcon("pics/m-green-dot.png");
            }
        }

    });

});