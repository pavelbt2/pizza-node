import { Component } from '@angular/core';
import { Router, RouteParams, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { OrderService } from './order.service';
import { LoginService } from './login.service';
import { LoginComponent } from './login.component';
import { OrdersComponent } from './orders.component';
import { DashboardComponent } from './dashboard.component';
import { OrderDetailComponent } from './order-detail.component';
import { NewOrderComponent } from './new-order.component';
import { ItemSelectionComponent } from './item-selection.component';
import { ItemDetailsSelectionComponent } from './item-details-selection.component';

@Component({
	selector: 's-pizza-app',
	templateUrl: 'app/app.component.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [
		ROUTER_PROVIDERS,
		OrderService, // needed for injection to child components
		LoginService
	], // providers list for dependency injection
	styleUrls: ['app/app.component.css'],
})

@RouteConfig([
	{
		path: '/login/',
		name: 'Login',
		component: LoginComponent,
		
	},
	{
		path: '/detail/',
		name: 'CurrentOrder',
		component: OrderDetailComponent,
		useAsDefault: true // this is the default route (for '/')
	},
	{
		path: '/detail/:id',
		name: 'OrderDetail',
		component: OrderDetailComponent
	},
	{
		path: '/new-order/',
		name: 'NewOrder',
		component: NewOrderComponent
	},		
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: DashboardComponent
	},	
	{
		path: '/orders', //the router matches this route's path to the URL in the browser address bar
		name: 'Orders', // the official name of the route; it must begin with a capital letter to avoid confusion with the path
		component: OrdersComponent // the component that the router should create when navigating to this route 
	},
	{
		path: '/item-selection/:orderId',
		name: 'ItemSelection',
		component: ItemSelectionComponent
	},
	{
		path: '/item-selection/:orderId/:itemId',
		name: 'ItemDetailsSelection',
		component: ItemDetailsSelectionComponent
	}		
	
])


export class AppComponent {
	title = 'Pizza Order Center';		
	
	constructor(private router: Router, private loginService: LoginService) {
	}
	
	ngOnInit() {
	}
	
	logout() {
		this.loginService.logout();
		let link = ['Login'];
		this.router.navigate(link);
	}
	
	
}


