import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise'; // import toPromise() for Observable
import { Order } from './order';

@Injectable()
export class OrderService {

	private allOrdersGetUrl = 'http://localhost:8080/Pizza/order/fetchall';
	private orderGetUrl = 'http://localhost:8080/Pizza/order/get';  // URL to web api TODO	
	private orderCreateUrl = 'http://localhost:8080/Pizza/order/create';
	private orderUpdateUrl = 'http://localhost:8080/Pizza/order/update';

	constructor(private http: Http) { }

	getOrders(): Promise<Order[]> {
		return this.http.get(this.allOrdersGetUrl) // returns Observable
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);		
	}
	
	getOrder(id: number) : Promise<Order> { // TODO is it OK to go to the server each time?
		let url = this.orderGetUrl;
		if (id != null) {
			let url = `${this.orderGetUrl}/${id}`;	
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
		if (order.id) {
			return this.updateOrder(order);
		}
		return this.createOrder(order);
	}	
	
	// Add new order
	private createOrder(order: Order): Promise<Order> {
		let headers = new Headers({
			'Content-Type': 'application/json'});

		return this.http
             .post(this.orderCreateUrl, JSON.stringify(order), {headers: headers})
             .toPromise()
             .then(res => res.json())
             .catch(this.handleError);
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
		
	private handleError(error: any) {
		console.error('An error occurred :(((', error);
		return Promise.reject(error.message || error);
		// TODO better handling?
	}		
	
}

