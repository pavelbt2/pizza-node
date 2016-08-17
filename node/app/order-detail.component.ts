import { Component, Input, Output, OnInit, EventEmitter, forwardRef, provide} from '@angular/core';
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
	
	navigated = false; // true if navigated here
	private error : string;
	
	constructor(private router: Router, private routeParams: RouteParams, 
		private orderService: OrderService, 
		private loginService: LoginService) {
			this.error = null;			
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
		this.orderService
			.submitOrder(this.order.id)
			.then(order => {
				this.order = order; // updated order
				console.info("submitted order: id=" + order.id);
			})
			.catch(error => {					
					this.error = error;
				}
			);
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
	
	// returns true iif this user can add an item 
	canAddItem() : boolean {
		if ((this.order.status.id == "OPEN")) {
			return true;
		}		
		return false;
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
	
	private getError() : string {
		return this.error;
	}
		
}
