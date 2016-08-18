"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var login_service_1 = require('./login.service');
var auth_1 = require('./auth');
var LoginComponent = (function () {
    function LoginComponent(router, loginService, routeParams) {
        this.router = router;
        this.loginService = loginService;
        this.routeParams = routeParams;
        this.close = new core_1.EventEmitter();
        this.error = null;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.auth = new auth_1.JwtAuthenticationRequest();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loginService
            .login(this.auth)
            .then(function (res) {
            console.info("login success.");
            var link = ['CurrentOrder'];
            _this.router.navigate(link);
        }) // must use then - otherwise won't wait for jwt
            .catch(function (error) {
            _this.error = error;
        });
    };
    LoginComponent.prototype.getError = function () {
        return this.error;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LoginComponent.prototype, "close", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 's-login',
            templateUrl: 'app/login.component.html',
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, login_service_1.LoginService, router_deprecated_1.RouteParams])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map