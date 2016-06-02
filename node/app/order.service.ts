import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise'; // import toPromise() for Observable
import 'rxjs/add/operator/map'; // TODO - OK?? copied from stackoverflow
import { Order } from './order';
import { Item } from './item';
import { OrderedItem } from './ordered-item';

@Injectable()
export class OrderService {

	private allOrdersGetUrl = 'http://localhost:8080/Pizza/order/fetchall';
	private orderGetUrl = 'http://localhost:8080/Pizza/order/get';  // URL to web api TODO	
	private orderUpdateUrl = 'http://localhost:8080/Pizza/order/update';
	private itemListUrl = 'http://localhost:8080/Pizza/item/fetchall';
	private addItemToOrderUrl = 'http://localhost:8080/Pizza/order/additem';

	private itemList : Promise<Item[]>; // keep to fetch only once
	

	constructor(private http: Http) {
	}	
		
	public getItemList() : Promise<Item[]> {	
		if (this.itemList == null) {
			console.info("getItemList() - fething from server");
			this.itemList = this.http.get(this.itemListUrl) // returns Observable
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
		}

		return this.itemList;
	}
	
	getOrders(): Promise<Order[]> {
		return this.http.get(this.allOrdersGetUrl) // returns Observable
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);		
	}
	
	getOrder(id: number) : Promise<Order> { // TODO is it OK to go to the server each time?
		console.info("getOrder(): id=" + id);
		let url = this.orderGetUrl;
		if (id != null) {
			url = `${this.orderGetUrl}/${id}`;	
		}
		
		return this.http.get(url) // returns Observable
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);	
	}
	
	getCurrentOrder() {
		return this.getOrder(null);	
	}

	// Add or Update an order
	saveOrder(order: Order): Promise<Order>  {
		return this.updateOrder(order);
	}	

	
	// Update existing order
	private updateOrder(order: Order) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.orderUpdateUrl}/${order.id}`;

		return this.http
             .post(url, JSON.stringify(order), {headers: headers})
             .toPromise()
             .then(() => order)
             .catch(this.handleError);
	}
	
	public addItemToOrder(orderId: number, orderedItem: OrderedItem) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.addItemToOrderUrl}/${orderId}`;

		return this.http
             .post(url, JSON.stringify(orderedItem), {headers: headers})
             .toPromise()
             //.then(() => ???)
			 // TODO return updated order
             .catch(this.handleError);		
	}
			
	private handleError(error: any) {
		console.error('An error occurred :(((', error);
		return Promise.reject(error.message || error);
		// TODO better handling?
	}
	
}

