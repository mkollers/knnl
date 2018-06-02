import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: './pages/login-page/login-page.module#LoginPageModule',
    },
    {
        path: 'register',
        loadChildren: './pages/register-page/register-page.module#RegisterPageModule',
    },
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
