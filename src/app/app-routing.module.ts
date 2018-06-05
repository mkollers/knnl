import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedInGuard } from './shared/auth/guards/logged-in.guard';

const routes: Routes = [
    {
        path: 'news',
        loadChildren: './pages/news/news-page/news-page.module#NewsPageModule',
        canActivate: [LoggedInGuard]
    },
    {
        path: 'login',
        loadChildren: './pages/login-page/login-page.module#LoginPageModule',
    },
    {
        path: 'register',
        loadChildren: './pages/register-page/register-page.module#RegisterPageModule',
    },
    { path: '**', redirectTo: 'news' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
