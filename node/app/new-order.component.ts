import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { Order } from './order';
import { OrderService } from './order.service';


@Component({
	selector: 's-new-order',
	templateUrl: 'app/new-order.component.html',
	//styleUrls: ['app/order-detail.component.css']
})

export class NewOrderComponent implements OnInit {
	@Input() // needed before using a route
	order: Order;	
	
	@Output() 
	close = new EventEmitter();
	
	error: any;
	navigated = false; // true if navigated here
	
	constructor(private router: Router, private orderService: OrderService, private routeParams: RouteParams) {
	}

	ngOnInit() {

		

	}
	
		
}
