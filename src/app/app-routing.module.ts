import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedInGuard } from './shared/auth/guards/logged-in.guard';
import { LoggedInComponent } from './shared/layout/components/logged-in/logged-in.component';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: './pages/auth/login-page/login-page.module#LoginPageModule',
    },
    {
        path: 'register',
        loadChildren: './pages/auth/register-page/register-page.module#RegisterPageModule',
    },
    {
        path: '',
        component: LoggedInComponent,
        canActivate: [LoggedInGuard],
        children: [
            {
                path: 'news',
                loadChildren: './pages/news/news-page/news-page.module#NewsPageModule',
            },
            {
                path: 'administration',
                children: [
                    {
                        path: 'users',
                        loadChildren: './pages/administration/user-list-page/user-list-page.module#UserListPageModule',
                    },
                    {
                        path: 'permissions',
                        loadChildren: './pages/administration/role-list-page/role-list-page.module#RoleListPageModule',
                    }
                ]
            },
            { path: '**', redirectTo: 'news' }
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
