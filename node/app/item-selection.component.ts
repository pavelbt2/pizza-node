import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { OrderService } from './order.service';
import { Item } from './item';

@Component({
	selector: 's-item-selection',
	templateUrl: 'app/item-selection.component.html',
	styleUrls: ['app/item-selection.component.css']    
})


export class ItemSelectionComponent implements OnInit {

    orderId : number;    
    itemList : Item[] = [];

	constructor(private router: Router, private orderService: OrderService, private routeParams: RouteParams) {
	}
 
    ngOnInit() {
		this.orderId = +this.routeParams.get('orderId');
        
        //this.itemList = this.orderService.getItemList();
        this.orderService.getItemList()
        .then(itemList => this.itemList = itemList);

        
		return;        
    }
    
    gotoItemDetail(item : Item) {
        console.info("gotoItemDetail(). item = "+item.pretty);
        let link = ['ItemDetailsSelection', { orderId : this.orderId, itemId: item.id }];
		this.router.navigate(link);
    }   
    
    goBack() {
		window.history.back();
	}
}
