import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { FaqComponent } from './faq/faq.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sobre', component: AboutComponent },
    { path: 'cardapio', component: MenuComponent },
    { path: 'duvidas', component: FaqComponent },
    { path: 'cadastro', component: RegisterComponent}

    // { path: '**', redirectTo: '' }
];
