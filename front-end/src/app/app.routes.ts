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
import { CheckoutComponent } from './checkout/checkout.component';
import { PanelComponent } from './admin/panel/panel.component';
import { AdminLayoutComponent } from './admin/layout/admin-layout.component';
import { AdminAuthGuard } from './admin/admin-auth.guard';
import { AdminLoginComponent } from './admin/login/admin-login.component';
import { CustomerLayoutComponent } from './layout/customer-layout/customer-layout.component';
import { ProductManagementComponent } from './admin/product-management/product-management.component';
import { ClientesComponent } from './admin/clientes/clientes.component';

export const routes: Routes = [
    {
        path: '', component: CustomerLayoutComponent, children: [
            { path: '', component: HomeComponent },
            { path: 'sobre', component: AboutComponent },
            { path: 'cardapio', component: MenuComponent },
            { path: 'duvidas', component: FaqComponent },
            { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: 'cadastro', component: RegisterComponent },
            { path: 'login', component: LoginComponent },
            { path: 'carrinho', component: CartComponent },
            { path: 'checkout', component: CheckoutComponent }
        ]
    },
    {
        path: 'admin', component: AdminLayoutComponent, canActivate: [AdminAuthGuard], children: [
            { path: 'painel', component: PanelComponent },
            { path: 'estoque', component: ProductManagementComponent },
            { path: 'clientes', component: ClientesComponent }
            
        ]
    },
    { path: 'admin/login', component: AdminLoginComponent },
    { path: '**', redirectTo: '' }
];
