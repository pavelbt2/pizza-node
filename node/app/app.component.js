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
var login_service_1 = require('./login.service');
var login_component_1 = require('./login.component');
var orders_component_1 = require('./orders.component');
var dashboard_component_1 = require('./dashboard.component');
var order_detail_component_1 = require('./order-detail.component');
var new_order_component_1 = require('./new-order.component');
var item_selection_component_1 = require('./item-selection.component');
var item_details_selection_component_1 = require('./item-details-selection.component');
var AppComponent = (function () {
    function AppComponent(router, loginService) {
        this.router = router;
        this.loginService = loginService;
        this.title = 'Pizza Order Center';
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.logout = function () {
        this.loginService.logout();
        var link = ['Login'];
        this.router.navigate(link);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 's-pizza-app',
            templateUrl: 'app/app.component.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                order_service_1.OrderService,
                login_service_1.LoginService
            ],
            styleUrls: ['app/app.component.css'],
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/login/',
                name: 'Login',
                component: login_component_1.LoginComponent,
            },
            {
                path: '/detail/',
                name: 'CurrentOrder',
                component: order_detail_component_1.OrderDetailComponent,
                useAsDefault: true // this is the default route (for '/')
            },
            {
                path: '/detail/:id',
                name: 'OrderDetail',
                component: order_detail_component_1.OrderDetailComponent
            },
            {
                path: '/new-order/',
                name: 'NewOrder',
                component: new_order_component_1.NewOrderComponent
            },
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: dashboard_component_1.DashboardComponent
            },
            {
                path: '/orders',
                name: 'Orders',
                component: orders_component_1.OrdersComponent // the component that the router should create when navigating to this route 
            },
            {
                path: '/item-selection/:orderId',
                name: 'ItemSelection',
                component: item_selection_component_1.ItemSelectionComponent
            },
            {
                path: '/item-selection/:orderId/:itemId',
                name: 'ItemDetailsSelection',
                component: item_details_selection_component_1.ItemDetailsSelectionComponent
            }
        ]), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, login_service_1.LoginService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map