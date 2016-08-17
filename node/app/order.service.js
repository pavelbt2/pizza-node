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
var ordered_item_1 = require('./ordered-item');
var login_service_1 = require('./login.service');
var OrderService = (function () {
    function OrderService(http, authHttp, loginService) {
        this.http = http;
        this.authHttp = authHttp;
        this.loginService = loginService;
        this.loginUrl = 'http://localhost:8080/Pizza/login';
        this.allOrdersGetUrl = 'http://localhost:8080/Pizza/api/order/fetchall';
        this.orderGetUrl = 'http://localhost:8080/Pizza/api/order/get';
        this.orderGetCurrentUrl = 'http://localhost:8080/Pizza/api/order/getcurrent';
        this.orderCreateUrl = 'http://localhost:8080/Pizza/api/order/create';
        this.orderSubmitUrl = 'http://localhost:8080/Pizza/api/order/submit';
        this.itemListUrl = 'http://localhost:8080/Pizza/api/item/fetchall';
        this.addItemToOrderUrl = 'http://localhost:8080/Pizza/api/order/additem';
    }
    OrderService.prototype.getItemList = function () {
        if (this.itemList == null) {
            console.info("getItemList() - fething from server");
            this.itemList = this.authHttp.get(this.itemListUrl) // returns Observable
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
        var url = "" + this.orderGetCurrentUrl;
        if (id != null) {
            url = this.orderGetUrl + "/" + id;
        }
        return this.authHttp.get(url) // returns Observable
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    OrderService.prototype.getCurrentOrder = function () {
        return this.getOrder(null);
    };
    // Create a new order
    OrderService.prototype.createNewOrder = function () {
        var url = "" + this.orderCreateUrl;
        return this.authHttp
            .post(url, null)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    OrderService.prototype.submitOrder = function (id) {
        console.info("submitOrder(): id=" + id);
        var url = this.orderSubmitUrl + "/" + id;
        return this.authHttp
            .post(url, null)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    OrderService.prototype.addItemToOrder = function (orderId, item, count, details) {
        var orderedItem = new ordered_item_1.OrderedItem();
        orderedItem.count = count;
        orderedItem.details = details;
        orderedItem.item = item;
        orderedItem.user = this.loginService.getLoggedInUser();
        var url = this.addItemToOrderUrl + "/" + orderId;
        return this.authHttp
            .post(url, JSON.stringify(orderedItem))
            .toPromise()
            .catch(this.handleError);
    };
    OrderService.prototype.handleError = function (error) {
        //console.error('An error occurred :((( status=', error.status+" message="+error.message);
        var reason = "server error";
        if (error.status == "403") {
            reason = 'Forbidden';
        }
        return Promise.reject(reason);
    };
    OrderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, login_service_1.LoginService])
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map