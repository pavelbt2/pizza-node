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
var ItemDetailsSelectionComponent = (function () {
    function ItemDetailsSelectionComponent(router, orderService, routeParams) {
        this.router = router;
        this.orderService = orderService;
        this.routeParams = routeParams;
        this.error = null;
    }
    ItemDetailsSelectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.orderId = +this.routeParams.get('orderId');
        this.itemId = this.routeParams.get('itemId');
        console.info("ItemDetailsSelectionComponent: "
            + "orderId=" + this.orderId + " itemId=" + this.itemId);
        this.orderService.getItemList()
            .then(function (itemList) {
            _this.item = itemList.find(function (item) { return item.id == _this.itemId; });
        });
        return;
    };
    ItemDetailsSelectionComponent.prototype.addToOrder = function () {
        var _this = this;
        this.orderService
            .addItemToOrder(this.orderId, this.item, this.count, this.details)
            .then(function () {
            _this.router.navigate(['OrderDetail', { id: _this.orderId }]);
        })
            .catch(function (error) {
            if (error == "Conflict") {
                error = "You've already ordered " + _this.item.pretty + "!!!";
            }
            _this.error = error;
        });
    };
    ItemDetailsSelectionComponent.prototype.goBack = function () {
        window.history.back();
    };
    ItemDetailsSelectionComponent.prototype.getError = function () {
        return this.error;
    };
    ItemDetailsSelectionComponent = __decorate([
        core_1.Component({
            selector: 's-item-selection',
            templateUrl: 'app/item-details-selection.component.html',
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, order_service_1.OrderService, router_deprecated_1.RouteParams])
    ], ItemDetailsSelectionComponent);
    return ItemDetailsSelectionComponent;
}());
exports.ItemDetailsSelectionComponent = ItemDetailsSelectionComponent;
//# sourceMappingURL=item-details-selection.component.js.map