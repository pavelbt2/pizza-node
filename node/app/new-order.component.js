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
var order_service_1 = require('./order.service');
var NewOrderComponent = (function () {
    function NewOrderComponent(router, orderService, routeParams) {
        this.router = router;
        this.orderService = orderService;
        this.routeParams = routeParams;
        this.close = new core_1.EventEmitter();
    }
    NewOrderComponent.prototype.ngOnInit = function () {
    };
    NewOrderComponent.prototype.createNewOrder = function () {
        var _this = this;
        this.orderService.createNewOrder()
            .then(function (order) {
            _this.order = order; // saved order
            console.info("created new order. id=" + order.id);
            _this.router.navigate(['OrderDetail', { id: order.id }]);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NewOrderComponent.prototype, "close", void 0);
    NewOrderComponent = __decorate([
        core_1.Component({
            selector: 's-new-order',
            templateUrl: 'app/new-order.component.html',
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, order_service_1.OrderService, router_deprecated_1.RouteParams])
    ], NewOrderComponent);
    return NewOrderComponent;
}());
exports.NewOrderComponent = NewOrderComponent;
//# sourceMappingURL=new-order.component.js.map