import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt'; 
import 'rxjs/add/operator/toPromise'; // import toPromise() for Observable
import 'rxjs/add/operator/map'; // TODO - OK?? copied from stackoverflow
import { Order } from './order';
import { Item } from './item';
import { OrderedItem } from './ordered-item';
import { JwtAuthenticationRequest } from './auth';
import { LoginService } from './login.service';

@Injectable()
export class OrderService {

	private loginUrl = 'http://localhost:8080/Pizza/login';
	private allOrdersGetUrl = 'http://localhost:8080/Pizza/api/order/fetchall';
	private orderGetUrl = 'http://localhost:8080/Pizza/api/order/get';
	private orderGetCurrentUrl = 'http://localhost:8080/Pizza/api/order/getcurrent';	
	private orderCreateUrl = 'http://localhost:8080/Pizza/api/order/create';
	private orderSubmitUrl = 'http://localhost:8080/Pizza/api/order/submit';
	private itemListUrl = 'http://localhost:8080/Pizza/api/item/fetchall';
	private addItemToOrderUrl = 'http://localhost:8080/Pizza/api/order/additem';

	private itemList : Promise<Item[]>; // keep to fetch only once

	constructor(public http: Http, public authHttp: AuthHttp, public loginService: LoginService) {
	}
		
	public getItemList() : Promise<Item[]> {	
		if (this.itemList == null) {
			console.info("getItemList() - fething from server");
			this.itemList = this.authHttp.get(this.itemListUrl) // returns Observable
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
		}

		return this.itemList;
	}
	
	public getOrders(): Promise<Order[]> {
		console.info("getOrders(): jwt="+localStorage.getItem('jwt'));
		return this.authHttp.get(this.allOrdersGetUrl) // returns Observable
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);		
	}
	
	public getOrder(id: number) : Promise<Order> { // TODO is it OK to go to the server each time?
		console.info("getOrder(): id=" + id);
		let url = `${this.orderGetCurrentUrl}`;
		if (id != null) {
			url = `${this.orderGetUrl}/${id}`;
		}
		
		return this.authHttp.get(url) // returns Observable
			.toPromise()
			.then(response => {
				return response.json()
				}
			)
			.catch(this.handleError);	
	}
	
	public getCurrentOrder() {
		return this.getOrder(null);	
	}

	// Create a new order
	public createNewOrder(): Promise<Order>  {		
		let url = `${this.orderCreateUrl}`;

		return this.authHttp
             .post(url, null)
             .toPromise()
             .then(response => response.json())
             .catch(this.handleError);
	}
	
	
	public submitOrder(id: number): Promise<Order>  {
		console.info("submitOrder(): id=" + id);
		let url = `${this.orderSubmitUrl}/${id}`;

		return this.authHttp
             .post(url, null)
             .toPromise()
             .then(response => 	 
					 response.json()
			 )
             .catch(this.handleError);
	}		
	
	public addItemToOrder(orderId: number, item : Item,
    	count : number, details : string ) {

        var orderedItem : OrderedItem = new OrderedItem();
        orderedItem.count = count;
        orderedItem.details = details;
        orderedItem.item = item;
		orderedItem.user = this.loginService.getLoggedInUser();

		let url = `${this.addItemToOrderUrl}/${orderId}`;

		return this.authHttp
             .post(url, JSON.stringify(orderedItem))
             .toPromise()
             //.then(() => ???)
             .catch(this.handleError);		
	}
			
	private handleError(error: any) {						
		//console.error('An error occurred :((( status=', error.status+" message="+error.message);
		let reason = "server error";
		switch (error.status) {
			case 401:
				reason = 'Unauthorised';
				break;
			case 403:
				reason = 'Forbidden';
				break;			
			case 409:
				reason = 'Conflict';
				break;				
		}
		
		return Promise.reject(reason);
	}
	
}

