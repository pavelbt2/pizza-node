import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { Order } from './order';
import { OrderService } from './order.service';
import { LoginService } from './login.service';


@Component({
	selector: 's-order-detail',
	templateUrl: 'app/order-detail.component.html',
	styleUrls: ['app/order-detail.component.css']
})

export class OrderDetailComponent implements OnInit {
	@Input() // needed before using a route
	order: Order;	
	
	@Output() 
	close = new EventEmitter();
	
	error: any;
	navigated = false; // true if navigated here
	
	constructor(private router: Router, private routeParams: RouteParams, 
		private orderService: OrderService, private loginService: LoginService) {
	}

	ngOnInit() {
		if (this.routeParams.get('id') !== null) {
			let id = +this.routeParams.get('id'); // the "+" is to convert the id from string to a number
			this.navigated = true;
			this.orderService.getOrder(id).then(order => this.order = order);
			return;
		}
		
		// present current order
		this.orderService.getCurrentOrder().then(
			order =>
			{			
				console.info("received order="+order);					
				if (order.valid == false) {
					console.info("currnet order doesn't exist yet");
					this.router.navigate(['NewOrder'])
				} else {
					console.info("currnet order set");
					this.order = order;	
				}
			} 
		
		);
		

	}
	
	submitOrder() {
		console.info("TODO");
				
		// this.orderService
		// 	.saveOrder(this.order)
		// 	.then(order => {				
		// 		this.order = order; // saved order, w/o id if new
		// 		console.info("saved order: id=" + order.id);
		// 		this.goBack(order);
		// 	})
		// 	.catch(error => this.error = error); // TODO: Display error message
	}
	
	// returns true iif this user can submit the order
	canSubmit() : boolean {
		if ((this.order.status.id != "OPEN") ||
			 (this.order.responsible != this.loginService.getLoggedInUser())
			) {
			return false;
		}
		
		return true;
	}
	
	gotoAddItem() {
		this.router.navigate(['ItemSelection', { orderId: this.order.id }])
	}
	
	goBack(savedOrder: Order = null) {
		this.close.emit(savedOrder);
		if (this.navigated) {
			window.history.back();	// TODO add guarging not to get out of the app
		}
	}
		
}
