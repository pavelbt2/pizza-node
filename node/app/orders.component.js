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
var order_detail_component_1 = require('./order-detail.component');
var OrdersComponent = (function () {
    // the c'tor creates orderService property + Angular supplies an istance when AppComponent is created.
    function OrdersComponent(router, orderService) {
        this.router = router;
        this.orderService = orderService;
        // Don't fetch the orders here! Not healthy...
    }
    OrdersComponent.prototype.ngOnInit = function () {
        this.getOrders();
    };
    OrdersComponent.prototype.onSelect = function (order) {
        this.selectedOrder = order;
        this.addingOrder = false;
    };
    OrdersComponent.prototype.getOrders = function () {
        var _this = this;
        this.orderService.getOrders().then(function (orders) { return _this.orders = orders; })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
        ;
    };
    OrdersComponent.prototype.gotoDetail = function () {
        this.router.navigate(['OrderDetail', { id: this.selectedOrder.id }]);
    };
    OrdersComponent.prototype.addOrder = function () {
        this.addingOrder = true;
        this.selectedOrder = null;
    };
    OrdersComponent.prototype.close = function (savedOrder) {
        this.addingOrder = false;
        if (savedOrder) {
            this.getOrders();
        }
    };
    OrdersComponent = __decorate([
        core_1.Component({
            selector: 's-orders',
            templateUrl: 'app/orders.component.html',
            styleUrls: ['app/orders.component.css'],
            directives: [order_detail_component_1.OrderDetailComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, order_service_1.OrderService])
    ], OrdersComponent);
    return OrdersComponent;
}());
exports.OrdersComponent = OrdersComponent;
//# sourceMappingURL=orders.component.js.map