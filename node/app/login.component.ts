import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { LoginService } from './login.service';
import { JwtAuthenticationRequest } from './auth'; 

@Component({
	selector: 's-login',
	templateUrl: 'app/login.component.html',
})

export class LoginComponent implements OnInit {
    
    auth: JwtAuthenticationRequest;    
    
	
	@Output() 
	close = new EventEmitter();
	
	private error : string;

	
	constructor(private router: Router, private loginService: LoginService, private routeParams: RouteParams) {
		this.error = null;
	}

	ngOnInit() {
        this.auth = new JwtAuthenticationRequest();		
	}
	
	login() {        
		this.loginService
			.login(this.auth)
			.then(res => {
               console.info("login success.");
                let link = ['CurrentOrder'];
		        this.router.navigate(link);				
			}) // must use then - otherwise won't wait for jwt
			.catch(error => {
                this.error = error;
            }); 			
	}	

	private getError() : string {
		return this.error;
	}
		
}
