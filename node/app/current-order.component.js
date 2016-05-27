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
var order_1 = require('./order');
var order_service_1 = require('./order.service');
var CurrentOrderComponent = (function () {
    function CurrentOrderComponent(orderService, routeParams) {
        this.orderService = orderService;
        this.routeParams = routeParams;
    }
    CurrentOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.orderService.getCurrentOrder().then(function (order) { return _this.order = order; });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', order_1.Order)
    ], CurrentOrderComponent.prototype, "order", void 0);
    CurrentOrderComponent = __decorate([
        core_1.Component({
            selector: 's-current-order',
            templateUrl: 'app/current-order.component.html',
            styleUrls: ['app/current-order.component.css']
        }), 
        __metadata('design:paramtypes', [order_service_1.OrderService, router_deprecated_1.RouteParams])
    ], CurrentOrderComponent);
    return CurrentOrderComponent;
}());
exports.CurrentOrderComponent = CurrentOrderComponent;
//# sourceMappingURL=current-order.component.js.map