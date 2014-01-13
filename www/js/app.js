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

require(['jquery', 'backbone', 'app/router', 'fastclick','async!http://maps.google.com/maps/api/js?sensor=false'], function ($, Backbone, Router) {

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