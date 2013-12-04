define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        EmployeeListView    = require('app/views/EmployeeList'),
        models              = require('app/models/employee'),
        tpl                 = require('text!tpl/Home.html'),

        template = _.template(tpl),cTime,teTime;


    return Backbone.View.extend({

        initialize: function () {
            this.employeeList = new models.EmployeeCollection();
            this.render();
        },

        render: function () {
            this.$el.html(template());
            this.listView = new EmployeeListView({collection: this.employeeList, el: $(".scroller", this.el)});
            return this;
        },

        events: {
            "touchend #test-a":    "clickstart",
            "touchend #test-b":    "clickstart",
            "click #test-a":    "clickend",
            "click #test-b":    "clickend",
            "keyup .search-key":    "search",
            "keypress .search-key": "onkeypress"
        },

        clickend: function (event) {
            cTime = Date.now();
            alert("end" + (cTime - teTime));
        },

        clickstart: function (event) {
            teTime = Date.now();
        },

        search: function (event) {
            var key = $('.search-key').val();
            this.employeeList.fetch({reset: true, data: {name: key}});
        },

        onkeypress: function (event) {
            if (event.keyCode === 13) { // enter key pressed
                event.preventDefault();
            }
        }

    });

});