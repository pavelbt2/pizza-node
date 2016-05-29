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
require('rxjs/add/operator/toPromise'); // import toPromise() for Observable
require('rxjs/add/operator/map'); // TODO - OK?? copied from stackoverflow
var OrderService = (function () {
    function OrderService(http) {
        var _this = this;
        this.http = http;
        this.allOrdersGetUrl = 'http://localhost:8080/Pizza/order/fetchall';
        this.orderGetUrl = 'http://localhost:8080/Pizza/order/get'; // URL to web api TODO	
        this.orderCreateUrl = 'http://localhost:8080/Pizza/order/create';
        this.orderUpdateUrl = 'http://localhost:8080/Pizza/order/update';
        this.itemListUrl = 'http://localhost:8080/Pizza/item/fetchall';
        this.itemList = []; // keep to fetch only once
        //put logic here since ngOnInit() doesn't work for Injectable
        console.info("order service c'tor");
        this.http.get(this.itemListUrl) // returns Observable
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (items) {
            _this.itemList = items;
            console.info("kuku " + _this.itemList);
        })
            .catch(this.handleError);
        console.info("kuku2 " + this.itemList);
    }
    OrderService.prototype.getItemList = function () {
        console.info("getItemList(). " + this.itemList);
        return this.itemList;
    };
    OrderService.prototype.getOrders = function () {
        return this.http.get(this.allOrdersGetUrl) // returns Observable
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
        return this.http.get(url) // returns Observable
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    OrderService.prototype.getCurrentOrder = function () {
        return this.getOrder(null);
    };
    // Add or Update an order
    OrderService.prototype.saveOrder = function (order) {
        if (order.id) {
            return this.updateOrder(order);
        }
        return this.createOrder(order);
    };
    // Add new order
    OrderService.prototype.createOrder = function (order) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        return this.http
            .post(this.orderCreateUrl, JSON.stringify(order), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
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
    OrderService.prototype.handleError = function (error) {
        console.error('An error occurred :(((', error);
        return Promise.reject(error.message || error);
        // TODO better handling?
    };
    OrderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map