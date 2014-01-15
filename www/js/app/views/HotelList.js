define(function(require) {

    "use strict";

    var $                   = require('jquery'),
        Handlebars          = require('handlebars'),
        Backbone            = require('backbone'),
        tpl_pt              = require('text!tpl/HotelList.html'),
        tpl_ls              = require('text!tpl/HotelList_ls.html'),

            template_pt = Handlebars.compile(tpl_pt),
            template_ls = Handlebars.compile(tpl_ls),
            template, map, infowindow, view, propertiesOnMap, color, isLS;

    return Backbone.View.extend({
        initialize: function (options) {
            /**
             * Replace dummy content with correct call to template data
             **/
            var html = '<div class="loading-content">loading...</div>';
            //Init global variables
            view = this;
            map = null;
            isLS = null;
            color = options.color;
            $(html).prependTo(this.$el);
            var supportsOrientationChange = "onorientationchange" in window,
                    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
            window.addEventListener(orientationEvent, supportsOrientationChange ? this.checkOrientationAndRender : this.checkResizeAndRender, false);

            this.collection.on("reset", supportsOrientationChange ? this.checkOrientationAndRender : this.checkResizeAndRender, this);
        },
        render: function() {
            this.$el.html(template({hotels: this.collection.toJSON(), color: color}));
            return this;
        },
        checkOrientationAndRender: function(event) {
            var prevIsLS = isLS;
            if (window.orientation === -90 || window.orientation === 90) {
                template = template_ls;
                isLS = true;
            } else {
                template = template_pt;
                isLS = false;
            }
            if (prevIsLS !== isLS) {
                view.render();
                view.initializeMap();
            }
        },
        checkResizeAndRender: function(event) {
            var prevIsLS = isLS;
            if (window.innerWidth > window.innerHeight) {
                template = template_ls;
                isLS = true;
            } else {
                template = template_pt;
                isLS = false;
            }
            if (prevIsLS !== isLS) {
                view.render();
                view.initializeMap();
            }
        },
        initializeMap: function() {
            if (isLS === true) {
                view.getPropertyCoords();
                var mapStyles = [{
                        featureType: "poi.business",
                        elementType: "all", // all, labels
                        stylers: [{visibility: "off"}]
                    }];
                var myOptions = {
                    center: propertiesOnMap.bounds.getCenter(), //new google.maps.LatLng(-34.397, 150.644),
                    zoom: 8,
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
//            google.maps.event.addListener(this.map, 'dragstart', function() {
//                var context = $.getContext();
//                context.dragStart = this.getCenter();
//            });
//            google.maps.event.addListener(this.map, 'dragend', function() {
//                var context = $.getContext();
//                if (context.searchOnDrag) {
//                    var dragEnd = this.getCenter();
//                    var radius = parseFloat(google.maps.geometry.spherical.computeDistanceBetween(this.getBounds().getNorthEast(), this.getBounds().getSouthWest())) / 2.0 / 2.0;
//                    if (parseFloat(google.maps.geometry.spherical.computeDistanceBetween(context.dragStart, dragEnd)) > radius) {
//                        context.model.propertiesMapData = null;
//                        context.openMap();
//                    }
//                }
//                context.dragStart = null;
//            });
//            google.maps.event.addListener(this.map, 'click', function(event) {
//
//                var context = $.getContext();
//                context.designOnMap(this, event, true);
//            });
                map.fitBounds(propertiesOnMap.bounds);
                view.initMarkers();
            }
        },
        getPropertyCoords: function() {
            var bounds = new google.maps.LatLngBounds();
            propertiesOnMap = new Object();
            propertiesOnMap.properties = new Array();

            for (var i = 0; i < this.collection.models.length; i++) {
                propertiesOnMap.properties[i] = this.collection.models[i].attributes.PropertyDetails;
                propertiesOnMap.properties[i].propertyID = this.collection.models[i].attributes.propertyID;
                propertiesOnMap.properties[i].position = new google.maps.LatLng(propertiesOnMap.properties[i].latitude, propertiesOnMap.properties[i].longitude);
                propertiesOnMap.properties[i].priceInfo = this.collection.models[i].attributes.AvailStays.AvailStay[0].PriceInfo;
                bounds.extend(propertiesOnMap.properties[i].position);
            }

            propertiesOnMap.bounds = bounds;
            console.log(propertiesOnMap.bounds.getCenter());
        },
        initMarkers: function() {
            this.markersList = [];
            for (var index = 0; index < propertiesOnMap.properties.length; index++) {
                var property = propertiesOnMap.properties[index];
                if (property.position) {
                    var marker = new google.maps.Marker({
                        position: property.position,
                        map: map
                    });
                    marker.htid = property.id;
                    marker.index = index;

                    marker.setTitle(property.name);
                    marker.setIcon("pics/m-green-dot.png");

                    this.markersList[index] = marker;
                    this.addMarkerEvent(marker, property);
                }
            }
        },
        addMarkerEvent: function(marker, property) {

            google.maps.event.addListener(marker, 'click', function() {
                if (infowindow)
                    infowindow.close();
                infowindow = new google.maps.InfoWindow();
                infowindow.setContent(view.drawComicStrip(property));
//                infowindow.setContent(property.name);
                infowindow.open(map, marker);
            });
        },
        drawComicStrip: function(property) {

            //init data
            if (!property) {
                return;
            }

            var name = property.name;
            var rating = property.category;
            var currency = property.priceInfo.currencyCode;
            var price = property.priceInfo.displayPrice;
            var hotelPath = property.photoURL;
            var hotelUrl =  "#hotel/"+property.propertyID;

            if (price === undefined || price === null) {
                price = '&nbsp;';
                currency = '&nbsp;';
            }

            //html
            var htmlStruct = [];
            htmlStruct.push('<div style="width:250px;height:40px;"');

            //div with hotel name and stars
            htmlStruct.push('<div class="hotelnamestars">');
            //title
            htmlStruct.push('<a href="' + hotelUrl + '">' + name + ' </a>');
            //rating
            if (rating !== undefined && rating !== '') {
                htmlStruct.push('<img alt="' + rating + '" src="pics/stars-'+rating+'.png"/>');
            }
            htmlStruct.push('</div>');
            
            htmlStruct.push('<div class="infoballoon">');
            //photo
            htmlStruct.push('<a href="' + hotelUrl + '"><img alt="' + name + '"  src="' + hotelPath + '" alt="" title="" class="nsm24" height="64" width="64" /></a>');
            //price box
            htmlStruct.push('<span>' + price + currency + '</span>');
            htmlStruct.push('</div>');

            htmlStruct.push('</div>');
            return htmlStruct.join("");
        }
    });

});