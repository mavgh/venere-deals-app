define(function(require) {

    "use strict";

    var $ = require('jquery'),
            Backbone = require('backbone'),
            Hotel = Backbone.Model.extend({
                urlRoot: "https://api.venere.com/xhi-1.0/services/XHI_HotelAvail.json?",
                fetch: function(options) {

                    //do specific pre-processing 

//                this.url = urlRoot + '{"XHI_HotelAvailRQ":{"guestCountryCode":"${guestCountryCode}","preferredPaymentCurrency":"${preferredPaymentCurrency}","msgEchoToken":"EchoTest","msgVersion":"1.00.004","start":"${CheckIn}","end":"${CheckOut}","numGuests":"2","numRooms":"1",avoidCache="false","AvailQueryByGeo":{"geoIDs":"${geoIDs}"},"AvailResultFormat":{"maxResultItems":"${maxResultItems}","offsetResultItems":"${offsetResultItems}","showPropertyDetails":"true","showDailyRates":"true","showRoomCancellationPolicies":"false","langID":"${langID}","orderBy":"category","orderDir":"desc"}}}';
                    this.url = this.urlRoot + '{"XHI_HotelAvailRQ":{"guestCountryCode":"IT","preferredPaymentCurrency":"EUR","msgEchoToken":"VenereDealTest","msgVersion":"1.00.004",'
                            + '"start":"' + options.data.startDate + '","duration":"P1D","numGuests":"2","numRooms":"1",avoidCache="false","AvailQueryByProperty":{"propertyIDs":"' + options.data.propertyID + '"},'
                            + '"AvailResultFormat":{"maxResultItems":"10","offsetResultItems":"0","showPropertyDetails":"true","showDailyRates":"true",'
                            + '"showRoomCancellationPolicies":"false","langID":"it","orderBy":"category","orderDir":"desc"}}}';
//                console.log("Hotel fetch - Sending request:"+this.url);
                    //Call Backbone's fetch
                    return Backbone.Collection.prototype.fetch.call(this, options);
                }
            }),
    HotelCatalogue = Backbone.Model.extend({
        urlRoot: "https://catalogs.venere.com/xhi-1.0/XHI_InventoryCatalogue?org=Expedia&user=venere_tester&psw=x1x2x3&",
        csvToObject: function(data) {
            var result = new Object();
            var lines = data.split('\n');
            if (lines.length>=2)
            {
                var fieldNames = lines[0].split('|');
                var fieldValues = lines[1].split('|');
                for (var i = 0; i < fieldNames.length; i++) {
                    if (fieldNames[i] !== null && fieldNames[i] !== '' && fieldValues[i] !== null && fieldValues[i] !== '')
                    {
                        if (fieldValues[i].indexOf(";") > -1)
                        {
                            result[fieldNames[i]] = fieldValues[i].split(';');
                        }
                        else
                        {
                            result[fieldNames[i]] = fieldValues[i];
                        }
                    }
                }
            }
            if (result["RoomImageURL"]!==undefined && result["RoomImageURL"].length >0)
            {
                result["RoomMainImageURL"]=result["RoomImageURL"][0];
            }
            if (result["userRating"]!==undefined && !isNaN(parseFloat(result["userRating"])))
            {
                result["userRatingRounded"]=Math.round(parseFloat(result["userRating"]));
            }
            return result;
        },
        fetch: function(options) {
            this.url = this.urlRoot + 'filter={"filter_properties":{"htids":[' + options.data.propertyID + ']},"fieldsList":["PROPERTY","PROPERTY_EXTENDED","IMAGE_RS"],"format":"csv","asfile":false}';
            var hotelCatalogue = this;
            return $.get(this.url, function(data) {
                console.log("Retrieved catalogue result for: "+options.data.propertyID);
                hotelCatalogue.attributes = hotelCatalogue.csvToObject(data);
            });
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
                    + '"start":"' + options.data.startDate + '","duration":"P1D","numGuests":"2","numRooms":"1",avoidCache="false","AvailQueryByGeo":{"geoIDs":"' + options.data.geoID + '"},'
                    + '"AvailResultFormat":{"maxResultItems":"10","offsetResultItems":"0","showPropertyDetails":"true","showDailyRates":"true",'
                    + '"showRoomCancellationPolicies":"false","langID":"it","orderBy":"category","orderDir":"desc"}}}';
//                console.log("HotelCollection fetch - Sending request:"+this.url);
            //Call Backbone's fetch
            return Backbone.Collection.prototype.fetch.call(this, options);
        },
        parse: function(response, options) {

            //do specific pre-processing 

            //replace small thumbnail with bigh thumb
            var availResult = response.XHI_HotelAvailRS.AvailResults.AvailResult;
            for (var i = 0; i < availResult.length; i++) {
                var photoURL = availResult[i].PropertyDetails.photoURL;
                var bigPhotoURL = photoURL.replace('.jpg', '_b.jpg');
                availResult[i].PropertyDetails.photoURL = bigPhotoURL;
            };

//                console.log("HotelCollection parse - Parsing response:"+JSON.stringify(response.XHI_HotelAvailRS.AvailResults.AvailResult));
            //Call Backbone's fetch
            options.success = true;
            options.fromcollection = true;
            return Backbone.Collection.prototype.parse.call(this, response.XHI_HotelAvailRS.AvailResults.AvailResult, options);
        }

    });

    return {
        Hotel: Hotel,
        HotelCatalogue: HotelCatalogue,
        HotelCollection: HotelCollection
    };

});