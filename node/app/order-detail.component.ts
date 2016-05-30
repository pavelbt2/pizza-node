import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { Order } from './order';
import { OrderService } from './order.service';


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
	
	constructor(private router: Router, private orderService: OrderService, private routeParams: RouteParams) {
	}

	ngOnInit() {
		if (this.routeParams.get('id') !== null) {
			let id = +this.routeParams.get('id'); // the "+" is to convert the id from string to a number
			this.navigated = true;
			this.orderService.getOrder(id).then(order => this.order = order);
			return;
		}
		
		// present current order
		this.orderService.getCurrentOrder().then(order => this.order = order);
		
		// shouldn't get here!!
		if (this.order == null) {
			// init to new Order if no order id selected - to have an object to edit in any case
		    this.navigated = false;
			this.order = new Order();
		}
	}
	
	save() {
		this.orderService
			.saveOrder(this.order)
			.then(order => {				
				this.order = order; // saved order, w/o id if new
				console.info("saved order: id=" + order.id);
				this.goBack(order);
			})
			.catch(error => this.error = error); // TODO: Display error message
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
