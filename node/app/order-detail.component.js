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
var login_service_1 = require('./login.service');
var OrderDetailComponent = (function () {
    function OrderDetailComponent(router, routeParams, orderService, loginService) {
        this.router = router;
        this.routeParams = routeParams;
        this.orderService = orderService;
        this.loginService = loginService;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
        this.error = null;
    }
    OrderDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.routeParams.get('id') !== null) {
            var id = +this.routeParams.get('id'); // the "+" is to convert the id from string to a number
            this.navigated = true;
            this.orderService.getOrder(id).then(function (order) { return _this.order = order; });
            return;
        }
        // present current order
        this.orderService.getCurrentOrder().then(function (order) {
            console.info("received order=" + order);
            if (order.valid == false) {
                console.info("currnet order doesn't exist yet");
                _this.router.navigate(['NewOrder']);
            }
            else {
                console.info("currnet order set");
                _this.order = order;
            }
        });
    };
    OrderDetailComponent.prototype.submitOrder = function () {
        var _this = this;
        this.orderService
            .submitOrder(this.order.id)
            .then(function (order) {
            _this.order = order; // updated order
            console.info("submitted order: id=" + order.id);
        })
            .catch(function (error) {
            _this.error = error;
        });
    };
    // returns true iif this user can submit the order
    OrderDetailComponent.prototype.canSubmit = function () {
        if ((this.order.status.id != "OPEN") ||
            (this.order.responsible != this.loginService.getLoggedInUser())) {
            return false;
        }
        return true;
    };
    // returns true iif this user can add an item 
    OrderDetailComponent.prototype.canAddItem = function () {
        if ((this.order.status.id == "OPEN")) {
            return true;
        }
        return false;
    };
    OrderDetailComponent.prototype.gotoAddItem = function () {
        this.router.navigate(['ItemSelection', { orderId: this.order.id }]);
    };
    OrderDetailComponent.prototype.goBack = function (savedOrder) {
        if (savedOrder === void 0) { savedOrder = null; }
        this.close.emit(savedOrder);
        if (this.navigated) {
            window.history.back(); // TODO add guarging not to get out of the app
        }
    };
    OrderDetailComponent.prototype.getError = function () {
        return this.error;
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
        __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteParams, order_service_1.OrderService, login_service_1.LoginService])
    ], OrderDetailComponent);
    return OrderDetailComponent;
}());
exports.OrderDetailComponent = OrderDetailComponent;
//# sourceMappingURL=order-detail.component.js.map