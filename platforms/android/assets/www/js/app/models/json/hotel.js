define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),

        Hotel = Backbone.Model.extend({

            urlRoot: "https://api.venere.com/xhi-1.0/services/XHI_HotelAvail.json?",
            fetch: function(options) {

                //do specific pre-processing 
                
//                this.url = urlRoot + '{"XHI_HotelAvailRQ":{"guestCountryCode":"${guestCountryCode}","preferredPaymentCurrency":"${preferredPaymentCurrency}","msgEchoToken":"EchoTest","msgVersion":"1.00.004","start":"${CheckIn}","end":"${CheckOut}","numGuests":"2","numRooms":"1",avoidCache="false","AvailQueryByGeo":{"geoIDs":"${geoIDs}"},"AvailResultFormat":{"maxResultItems":"${maxResultItems}","offsetResultItems":"${offsetResultItems}","showPropertyDetails":"true","showDailyRates":"true","showRoomCancellationPolicies":"false","langID":"${langID}","orderBy":"category","orderDir":"desc"}}}';
                this.url = this.urlRoot + '{"XHI_HotelAvailRQ":{"guestCountryCode":"IT","preferredPaymentCurrency":"EUR","msgEchoToken":"VenereDealTest","msgVersion":"1.00.004",'
                        +'"start":"'+options.data.startDate+'","duration":"P1D","numGuests":"2","numRooms":"1",avoidCache="false","AvailQueryByProperty":{"propertyIDs":"'+options.data.propertyID+'"},'
                        +'"AvailResultFormat":{"maxResultItems":"10","offsetResultItems":"0","showPropertyDetails":"true","showDailyRates":"true",'
                        +'"showRoomCancellationPolicies":"false","langID":"it","orderBy":"category","orderDir":"desc"}}}';
                console.log("Hotel fetch - Sending request:"+this.url);
                //Call Backbone's fetch
                return Backbone.Collection.prototype.fetch.call(this, options);
            }
        }),

        HotelCollection = Backbone.Collection.extend({

            model: Hotel,
            
            //urlRoot: "http://java-acme.dev.venere.it/area0-node0/xhi-1.0/services/XHI_HotelAvail.json?",
            urlRoot: "https://api.venere.com/xhi-1.0/services/XHI_HotelAvail.json?",
            fetch: function(options) {

                //do specific pre-processing 
                
//                this.url = urlRoot + '{"XHI_HotelAvailRQ":{"guestCountryCode":"${guestCountryCode}","preferredPaymentCurrency":"${preferredPaymentCurrency}","msgEchoToken":"EchoTest","msgVersion":"1.00.004","start":"${CheckIn}","end":"${CheckOut}","numGuests":"2","numRooms":"1",avoidCache="false","AvailQueryByGeo":{"geoIDs":"${geoIDs}"},"AvailResultFormat":{"maxResultItems":"${maxResultItems}","offsetResultItems":"${offsetResultItems}","showPropertyDetails":"true","showDailyRates":"true","showRoomCancellationPolicies":"false","langID":"${langID}","orderBy":"category","orderDir":"desc"}}}';
                this.url = this.urlRoot + '{"XHI_HotelAvailRQ":{"guestCountryCode":"IT","preferredPaymentCurrency":"EUR","msgEchoToken":"VenereDealTest","msgVersion":"1.00.004",'
                        +'"start":"'+options.data.startDate+'","duration":"P1D","numGuests":"2","numRooms":"1",avoidCache="false","AvailQueryByGeo":{"geoIDs":"'+options.data.geoID+'"},'
                        +'"AvailResultFormat":{"maxResultItems":"10","offsetResultItems":"0","showPropertyDetails":"true","showDailyRates":"true",'
                        +'"showRoomCancellationPolicies":"false","langID":"it","orderBy":"category","orderDir":"desc"}}}';
                console.log("HotelCollection fetch - Sending request:"+this.url);
                //Call Backbone's fetch
                return Backbone.Collection.prototype.fetch.call(this, options);
            },

            parse: function(response, options) {

                //do specific pre-processing 
                
                console.log("HotelCollection parse - Parsing response:"+JSON.stringify(response.XHI_HotelAvailRS.AvailResults.AvailResult));
                //Call Backbone's fetch
                options.success = true;
                options.fromcollection = true;
                return Backbone.Collection.prototype.parse.call(this, response.XHI_HotelAvailRS.AvailResults.AvailResult, options);
            }

        });

    return {
        Hotel: Hotel,
        HotelCollection: HotelCollection
    };

});