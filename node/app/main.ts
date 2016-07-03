import { bootstrap }    from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http'; // TODO move to AppComponent
import { AuthConfig, AuthHttp } from 'angular2-jwt'; 
import { AppComponent } from './app.component';

bootstrap(
    AppComponent,
    [ 
        HTTP_PROVIDERS,
        provide(AuthHttp, {
            useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
                    tokenName: 'jwt',
                    globalHeaders: [{'Content-Type':'application/json'}],
                }), http);
            },
      
            deps: [Http]
        }) 
    ]
);
