require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl'
    },

    map: {
        '*': {
            'app/models/theme':'app/models/memory/theme',
            'app/models/city':'app/models/memory/city',
            'app/models/hotel':'app/models/json/hotel'
        }
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});

require(['jquery', 'backbone', 'app/router', 'fastclick'], function ($, Backbone, Router) {
    
    
  var iOS7 = window.device
                && window.device.platform 
                && window.device.platform.toLowerCase() === "ios"
                && parseFloat(window.device.version) >= 7.0;
        if (iOS7) {
            StatusBar.overlaysWebView(false);
            //StatusBar.backgroundColorByName("orange");
            StatusBar.styleBlackOpaque();
         }

    //Setup header Authorization (venere_tester)
    $.ajaxSetup({
        headers: {
            'Authorization':'Basic dmVuZXJlX3Rlc3RlckBFeHBlZGlhOngxeDJ4Mw=='
        }
    });
//    Access-Control-Allow-Origin: *
//Access-Control-Allow-Methods: GET, POST, PUT, DELETE
//Access-Control-Allow-Headers: Authorization
    var router = new Router();

    $("body").on("click", ".back-button", function (event) {
        event.preventDefault();
        window.history.back();
    });

    Backbone.history.start();
    
    //Attach fastclick for Mobile Device
    FastClick.attach(document.body);
});