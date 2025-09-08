import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChannelslistComponent } from './channelslist/channelslist.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'channels/:id', component: ChannelslistComponent },
    { path: '**', component: LoginComponent }
];
