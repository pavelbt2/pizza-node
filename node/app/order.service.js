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
var OrderService = (function () {
    function OrderService(http, authHttp) {
        this.http = http;
        this.authHttp = authHttp;
        this.loginUrl = 'http://localhost:8080/Pizza/login';
        this.allOrdersGetUrl = 'http://localhost:8080/Pizza/api/order/fetchall';
        this.orderGetUrl = 'http://localhost:8080/Pizza/api/order/get'; // URL to web api TODO	
        this.orderUpdateUrl = 'http://localhost:8080/Pizza/api/order/update';
        this.itemListUrl = 'http://localhost:8080/Pizza/api/item/fetchall';
        this.addItemToOrderUrl = 'http://localhost:8080/Pizza/api/order/additem';
    }
    OrderService.prototype.login = function (auth) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.loginUrl, JSON.stringify(auth), { headers: headers })
            .toPromise()
            .then(function (response) {
            console.info("got jwt token from server: " + response.json().token);
            localStorage.setItem('jwt', response.json().token);
        })
            .catch(this.handleError);
    };
    OrderService.prototype.getItemList = function () {
        if (this.itemList == null) {
            console.info("getItemList() - fething from server");
            this.itemList = this.http.get(this.itemListUrl) // returns Observable
                .toPromise()
                .then(function (response) { return response.json(); })
                .catch(this.handleError);
        }
        return this.itemList;
    };
    OrderService.prototype.getOrders = function () {
        console.info("getOrders(): jwt=" + localStorage.getItem('jwt'));
        return this.authHttp.get(this.allOrdersGetUrl) // returns Observable
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    OrderService.prototype.getOrder = function (id) {
        console.info("getOrder(): id=" + id);
        var url = this.orderGetUrl;
        if (id != null) {
            url = this.orderGetUrl + "/" + id;
        }
        return this.authHttp.get(url) // returns Observable
            .toPromise()
            .then(function (response) {
            console.info("got response " + response);
            return response.json();
        })
            .catch(this.handleError);
    };
    OrderService.prototype.getCurrentOrder = function () {
        return this.getOrder(null);
    };
    // Add or Update an order
    OrderService.prototype.saveOrder = function (order) {
        return this.updateOrder(order);
    };
    // Update existing order
    OrderService.prototype.updateOrder = function (order) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.orderUpdateUrl + "/" + order.id;
        return this.http
            .post(url, JSON.stringify(order), { headers: headers })
            .toPromise()
            .then(function () { return order; })
            .catch(this.handleError);
    };
    OrderService.prototype.addItemToOrder = function (orderId, orderedItem) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.addItemToOrderUrl + "/" + orderId;
        return this.http
            .post(url, JSON.stringify(orderedItem), { headers: headers })
            .toPromise()
            .catch(this.handleError);
    };
    OrderService.prototype.handleError = function (error) {
        console.error('An error occurred :(((', error);
        return Promise.reject(error.message || error);
        // TODO better handling?
    };
    OrderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp])
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map