import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Order } from './order';
import { OrderService } from './order.service';
import { LoginService } from './login.service';

@Component({
	selector: 's-dashboard',
	templateUrl: 'app/dashboard.component.html',
		// Full path. Angular doesn't support module-relative paths.
	styleUrls: ['app/dashboard.component.css']
})


export class DashboardComponent
 implements OnInit 
 {
	orders: Order[] = [];
	
	constructor(private router: Router, private orderService: OrderService,
		private loginService: LoginService) { 		 
	}
	
	ngOnInit() {		
		if (!this.loginService.isLoggedIn()) {
			console.info("not logged in - redirecting to login page");
			this.router.navigate(['Login']);
			return;
		}
		
		this.orderService.getOrders()
		.then(orders => this.orders = orders.slice(0,4))
		;
	}
	
	gotoDetail(order: Order){
		let link = ['OrderDetail', { id: order.id }];
		this.router.navigate(link);	
	}
}

