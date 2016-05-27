import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise'; // import toPromise() for Observable
import { Order } from './order';

@Injectable()
export class OrderService {

	private ordersGetUrl = 'http://localhost:8080/Pizza/order/fetchall';  // URL to web api TODO
	private ordersCreateUrl = 'http://localhost:8080/Pizza/order/create';
	private ordersUpdateUrl = 'http://localhost:8080/Pizza/order/update';

	constructor(private http: Http) { }

	getOrders(): Promise<Order[]> {
		return this.http.get(this.ordersGetUrl) // returns Observable
			.toPromise()
			.then(response => response.json()) // TODO match the web API
							// TODO need .data???
			.catch(this.handleError);		
	}
	
	// TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
	getOrder(id: number) { // TODO is it OK to go to the server each time??? + if so - do only for specific order!!
		return this.getOrders()
               .then(orders => orders.filter(order => order.id === id)[0]);
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
             .post(this.ordersCreateUrl, JSON.stringify(order), {headers: headers})
             .toPromise()
             .then(res => res.json())
             .catch(this.handleError);
	}
	
	// Update existing order
	private updateOrder(order: Order) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.ordersUpdateUrl}/${order.id}`;

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

