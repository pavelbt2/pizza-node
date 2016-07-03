import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { OrderService } from './order.service';
import { JwtAuthenticationRequest } from './auth';


@Component({
	selector: 's-login',
	templateUrl: 'app/login.component.html',
//	styleUrls: ['app/order-detail.component.css']
})

export class LoginComponent implements OnInit {
    
    auth: JwtAuthenticationRequest;    
    
	
	@Output() 
	close = new EventEmitter();
	
	error: any;

	
	constructor(private router: Router, private orderService: OrderService, private routeParams: RouteParams) {
	}

	ngOnInit() {
        this.auth = new JwtAuthenticationRequest();		
	}
	
	login() {
        // TODO check that not user+password empty
        console.info("trying to login: user = " + this.auth.username + " password = " + this.auth.password);
        
		this.orderService
			.login(this.auth)
			.then(res => {
               console.info("login success.");
                let link = ['CurrentOrder'];
		        this.router.navigate(link);				
			})
			.catch(error => {
                this.error = error;
                console.info("login error.");
                // TODO: Display error message
            }); 
	}	
		
}
