define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        Handlebars          = require('handlebars'),
        models              = require('app/models/employee'),
        tpl                 = require('text!tpl/Home.html'),

        template = Handlebars.compile(tpl),cTime,teTime;

    return Backbone.View.extend({

        initialize: function () {
            this.employeeList = new models.EmployeeCollection();
            this.employeeList.fetch({reset: true, data: {name: 'a'}});
            this.render();
        },

        render: function () {
            this.$el.html(template({employees: this.employeeList.toJSON()}));
            return this;
        },
    });

});