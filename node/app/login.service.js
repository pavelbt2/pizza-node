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
var http_1 = require('@angular/http');
var angular2_jwt_1 = require('angular2-jwt');
require('rxjs/add/operator/toPromise'); // import toPromise() for Observable
require('rxjs/add/operator/map'); // TODO - OK?? copied from stackoverflow
var LoginService = (function () {
    function LoginService(http, authHttp) {
        this.http = http;
        this.authHttp = authHttp;
        this.loginUrl = 'http://localhost:8080/Pizza/login';
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        this.isLoggedin = false;
        if (angular2_jwt_1.tokenNotExpired('jwt')) {
            console.info("logged in");
            this.isLoggedin = true;
            this.user = this.getUserFromJwt();
            console.info("user=" + this.user);
        }
    }
    LoginService.prototype.getUserFromJwt = function () {
        return this.jwtHelper.decodeToken(localStorage.getItem('jwt')).userId;
    };
    LoginService.prototype.login = function (auth) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.loginUrl, JSON.stringify(auth), { headers: headers })
            .toPromise()
            .then(function (response) {
            console.info("got jwt token from server: " + response.json().token);
            localStorage.setItem('jwt', response.json().token);
            _this.isLoggedin = true;
            _this.user = _this.getUserFromJwt();
        })
            .catch(this.handleError);
    };
    LoginService.prototype.logout = function () {
        console.info("logout");
        localStorage.removeItem('jwt');
        this.isLoggedin = false;
        this.user = null;
    };
    LoginService.prototype.isLoggedIn = function () {
        return this.isLoggedin;
    };
    LoginService.prototype.getLoggedInUser = function () {
        return this.user;
    };
    LoginService.prototype.handleError = function (error) {
        console.error('An error occurred during login :(((', error);
        return Promise.reject(error.message || error);
        // TODO better handling?
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map