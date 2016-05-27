import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Order } from './order';
import { OrderService } from './order.service';

@Component({
	selector: 's-current-order',
	templateUrl: 'app/current-order.component.html',
	styleUrls: ['app/current-order.component.css']
})

export class CurrentOrderComponent implements OnInit {

	@Input() // needed?
	order: Order;	
    
    error: any;

	constructor(private orderService: OrderService, private routeParams: RouteParams) {
	}
    
    ngOnInit() {
        this.orderService.getCurrentOrder().then(order => this.order = order);
    }
    
    
}