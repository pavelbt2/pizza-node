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
var orders_component_1 = require('./orders.component');
var dashboard_component_1 = require('./dashboard.component');
var order_detail_component_1 = require('./order-detail.component');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Pizza Order Center';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 's-pizza-app',
            template: "\n\t\t<h1>{{title}}</h1>\n\t\t<nav>\n\t\t\t<a [routerLink]=\"['CurrentOrder']\">Current Order</a>\n\t\t\t<a [routerLink]=\"['Dashboard']\">Dashboard</a>\n\t\t\t<a [routerLink]=\"['Orders']\">Orders</a>\t\t\t\n\t\t<nav>\n\t\t<router-outlet>\n\t",
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                order_service_1.OrderService // needed for injection to child components
            ],
            styleUrls: ['app/app.component.css'],
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/detail/',
                name: 'CurrentOrder',
                component: order_detail_component_1.OrderDetailComponent,
                useAsDefault: true // this is the default route (for '/')
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
                path: '/detail/:id',
                name: 'OrderDetail',
                component: order_detail_component_1.OrderDetailComponent
            }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map