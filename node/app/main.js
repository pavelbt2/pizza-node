"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http'); // TODO move to AppComponent
var angular2_jwt_1 = require('angular2-jwt');
var app_component_1 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    core_1.provide(angular2_jwt_1.AuthHttp, {
        useFactory: function (http) {
            return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig({
                tokenName: 'jwt',
                globalHeaders: [{ 'Content-Type': 'application/json' }],
            }), http);
        },
        deps: [http_1.Http]
    })
]);
//# sourceMappingURL=main.js.map