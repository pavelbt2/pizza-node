import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { Order } from './order';
import { OrderService } from './order.service';
import { LoginService } from './login.service';


@Component({
	selector: 's-new-order',
	templateUrl: 'app/new-order.component.html',
	//styleUrls: ['app/order-detail.component.css']
})

export class NewOrderComponent implements OnInit {
		
	@Output() 
	close = new EventEmitter();

	order: Order;	
	error: any;
	
	constructor(private router: Router, private orderService: OrderService, private loginService:LoginService, private routeParams: RouteParams) {
	}

	ngOnInit() {
		
	}
	

	createNewOrder() {
		this.orderService.createNewOrder()
		.then(order => {
				this.order = order; // saved order
				console.info("created new order. id="+order.id);
						this.router.navigate(['OrderDetail', { id: order.id }]);
			})
			.catch(error => this.error = error); // TODO: Display error message
	}
		
}
