import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http'; // TODO mode to AppComponent

import { AppComponent } from './app.component';

bootstrap(AppComponent, [ HTTP_PROVIDERS ]);
