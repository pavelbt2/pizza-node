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
var OrderDetailComponent = (function () {
    function OrderDetailComponent(orderService, routeParams) {
        this.orderService = orderService;
        this.routeParams = routeParams;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
    }
    OrderDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.routeParams.get('id') !== null) {
            var id = +this.routeParams.get('id'); // the "+" is to convert the id from string to a number
            this.navigated = true;
            this.orderService.getOrder(id).then(function (order) { return _this.order = order; });
        }
        else {
            // init to new Order if no order id selected - to have an object to edit in any case
            this.navigated = false;
            this.order = new order_1.Order();
        }
    };
    OrderDetailComponent.prototype.save = function () {
        var _this = this;
        this.orderService
            .saveOrder(this.order)
            .then(function (order) {
            _this.order = order; // saved order, w/o id if new
            console.info("saved order: id=" + order.id);
            _this.goBack(order);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    OrderDetailComponent.prototype.goBack = function (savedOrder) {
        if (savedOrder === void 0) { savedOrder = null; }
        this.close.emit(savedOrder);
        if (this.navigated) {
            window.history.back(); // TODO add guarging not to get out of the app
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', order_1.Order)
    ], OrderDetailComponent.prototype, "order", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OrderDetailComponent.prototype, "close", void 0);
    OrderDetailComponent = __decorate([
        core_1.Component({
            selector: 's-order-detail',
            templateUrl: 'app/order-detail.component.html',
            styleUrls: ['app/order-detail.component.css']
        }), 
        __metadata('design:paramtypes', [order_service_1.OrderService, router_deprecated_1.RouteParams])
    ], OrderDetailComponent);
    return OrderDetailComponent;
}());
exports.OrderDetailComponent = OrderDetailComponent;
//# sourceMappingURL=order-detail.component.js.map