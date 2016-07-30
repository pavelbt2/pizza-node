import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt'; 
import 'rxjs/add/operator/toPromise'; // import toPromise() for Observable
import 'rxjs/add/operator/map'; // TODO - OK?? copied from stackoverflow
import { JwtAuthenticationRequest } from './auth';

@Injectable()
export class LoginService {

	private loginUrl = 'http://localhost:8080/Pizza/login';

    jwtHelper: JwtHelper = new JwtHelper();
	private isLoggedin: boolean = false;
    private user: string;

	constructor(public http: Http, public authHttp: AuthHttp) {
        if  (tokenNotExpired('jwt')) {            
			console.info("logged in");
            this.isLoggedin=true;			
			this.user = this.getUserFromJwt();
            console.info("user="+this.user);
		} 		
	}
	
	private getUserFromJwt(): string {
		return this.jwtHelper.decodeToken(
				localStorage.getItem('jwt')).userId;
	}
	
	public login(auth: JwtAuthenticationRequest) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http
             .post(this.loginUrl, JSON.stringify(auth), {headers: headers})
             .toPromise()
             .then(response => {
				 console.info("got jwt token from server: " +  response.json().token);
				 localStorage.setItem('jwt', response.json().token);
				 this.isLoggedin = true;
				 this.user = this.getUserFromJwt();
			 })
             .catch(this.handleError);		
	}
    
    logout() {
		console.info("logout");
		localStorage.removeItem('jwt');
        this.isLoggedin = false;
        this.user = null;
	}
	
	public isLoggedIn() : boolean {
		return this.isLoggedin;
	}
	
	public getLoggedInUser() : string {
		return this.user;
	}
			
            
	private handleError(error: any) {
		console.error('An error occurred during login :(((', error);
		return Promise.reject(error.message || error);
		// TODO better handling?
	}            
}

