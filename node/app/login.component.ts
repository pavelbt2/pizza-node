import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { LoginService } from './login.service';
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

	
	constructor(private router: Router, private loginService: LoginService, private routeParams: RouteParams) {
	}

	ngOnInit() {
        this.auth = new JwtAuthenticationRequest();		
	}
	
	login() {
        // TODO check that not user+password empty
        console.info("trying to login: user = " + this.auth.username + " password = " + this.auth.password);
        
		this.loginService
			.login(this.auth)
			.then(res => {
               console.info("login success.");
                let link = ['CurrentOrder'];
		        this.router.navigate(link);				
			}) // must use then - otherwise won't wait for jwt
			.catch(error => {
                this.error = error;
                console.info("login error.");
                // TODO: Display error message
            }); 
			
	}	
		
}
