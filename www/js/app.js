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
            'app/models/hotel':'app/models/memory/hotel'
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

    var router = new Router();

    $("body").on("click", ".back-button", function (event) {
        event.preventDefault();
        window.history.back();
    });

    Backbone.history.start();
    
    //Attach fastclick for Mobile Device
    FastClick.attach(document.body);
});