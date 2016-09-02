import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Order } from './order';
import { OrderService } from './order.service';
import { OrderDetailComponent } from './order-detail.component';
import { LoginService } from './login.service';

@Component({
	selector: 's-orders',
	templateUrl: 'app/orders.component.html',
	styleUrls:  ['app/orders.component.css'],
	directives: [OrderDetailComponent]
})

export class OrdersComponent implements OnInit { 
	orders: Order[];
	selectedOrder: Order;
	addingOrder: boolean;
	error: any;

	// the c'tor creates orderService property + Angular supplies an istance when AppComponent is created.
	constructor(private router: Router, private orderService: OrderService,
		private loginService: LoginService) {
		// Don't fetch the orders here! Not healthy...
	}	

	ngOnInit() {
		if (!this.loginService.isLoggedIn()) {
			console.info("not logged in - redirecting to login page");
			this.router.navigate(['Login']);
			return;
		}
		
		this.getOrders();
	}	
	
	private getOrders() {
		this.orderService.getOrders().then(orders => this.orders = orders)
		.catch(error => this.error = error); // TODO: Display error message
		;
	}
	
	gotoDetail(order: Order) {
		this.router.navigate(['OrderDetail', { id: order.id }]);
	}

	close(savedOrder: Order) {
		this.addingOrder = false;
		if (savedOrder) {
			this.getOrders(); 
		}
	}	

}


