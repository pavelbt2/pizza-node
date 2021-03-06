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
var ItemSelectionComponent = (function () {
    function ItemSelectionComponent(router, orderService, routeParams) {
        this.router = router;
        this.orderService = orderService;
        this.routeParams = routeParams;
        this.itemList = [];
    }
    ItemSelectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.orderId = +this.routeParams.get('orderId');
        //this.itemList = this.orderService.getItemList();
        this.orderService.getItemList()
            .then(function (itemList) { return _this.itemList = itemList; });
        return;
    };
    ItemSelectionComponent.prototype.gotoItemDetail = function (item) {
        console.info("gotoItemDetail(). item = " + item.pretty);
        var link = ['ItemDetailsSelection', { orderId: this.orderId, itemId: item.id }];
        this.router.navigate(link);
    };
    ItemSelectionComponent.prototype.goBack = function () {
        window.history.back();
    };
    ItemSelectionComponent = __decorate([
        core_1.Component({
            selector: 's-item-selection',
            templateUrl: 'app/item-selection.component.html',
            styleUrls: ['app/item-selection.component.css']
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, order_service_1.OrderService, router_deprecated_1.RouteParams])
    ], ItemSelectionComponent);
    return ItemSelectionComponent;
}());
exports.ItemSelectionComponent = ItemSelectionComponent;
//# sourceMappingURL=item-selection.component.js.map