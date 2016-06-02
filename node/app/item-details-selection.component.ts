import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { OrderService } from './order.service';
import { Item } from './item';
import { OrderedItem } from './ordered-item';

@Component({
	selector: 's-item-selection',
	templateUrl: 'app/item-details-selection.component.html',
	//styleUrls: ['app/item-selection.component.css']    
})

export class ItemDetailsSelectionComponent implements OnInit {
    
    orderId : number;
    itemId : string;
    item : Item;
    count : number;
    details : string;
    user : string;
    
    error: any;
    
    constructor(private router: Router, private orderService: OrderService, private routeParams: RouteParams) {
	}
    
    ngOnInit() {
		this.orderId = +this.routeParams.get('orderId');
        this.itemId = this.routeParams.get('itemId');
        
        console.info("ItemDetailsSelectionComponent: "
            +"orderId="+this.orderId+" itemId="+this.itemId);
        
        this.orderService.getItemList()
        .then(itemList =>
			{
				this.item = itemList.find(item => item.id == this.itemId);
			} 
		)        
        
		return;        
    }
    
    placeOrder() {
        
        var orderedItem : OrderedItem = new OrderedItem();
        orderedItem.count = this.count;
        orderedItem.user = this.user;
        orderedItem.details = this.details;
        orderedItem.item = this.item;
        orderedItem.orderId = this.orderId;
        
		this.orderService
			.addItemToOrder(this.orderId, orderedItem)
			.then(() => {
                this.router.navigate(['OrderDetail', { id: this.orderId }]);                
			})
			.catch(error => this.error = error); // TODO: Display error message
            

    }
    
    goBack() {
		window.history.back();
	}    

}
