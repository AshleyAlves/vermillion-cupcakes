import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { FaqComponent } from './faq/faq.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './core/cart/cart.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sobre', component: AboutComponent },
    { path: 'cardapio', component: MenuComponent },
    { path: 'duvidas', component: FaqComponent },
    { path: 'cadastro', component: RegisterComponent},
    { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent},
    { path: 'carrinho', component: CartComponent },
    { path: '**', redirectTo: '' }
];
