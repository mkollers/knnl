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
                        path: 'permissions',
                        loadChildren: './pages/administration/permissions-page/permissions-page.module#PermissionsPageModule',
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
