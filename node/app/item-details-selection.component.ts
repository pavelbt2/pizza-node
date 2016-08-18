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
    
    private error : string;
    
    constructor(private router: Router, private orderService: OrderService, private routeParams: RouteParams) {
        this.error = null;
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
    
    addToOrder() {        
		this.orderService
			.addItemToOrder(this.orderId, this.item, this.count, this.details)
			.then(() => {
                this.router.navigate(['OrderDetail', { id: this.orderId }]);                
			})
			.catch(error => {
                    if (error == "Conflict") {
                        error = "You've already ordered " + this.item.pretty + "!!!";
                    }                					
					this.error = error;
				}
			);
            
    }
    
    goBack() {
		window.history.back();
	}
    
	private getError() : string {
		return this.error;
	}    

}
