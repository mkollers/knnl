import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedInGuard } from './shared/auth/guards/logged-in.guard';
import { LoggedInComponent } from './shared/layout/components/logged-in/logged-in.component';
import { CurrentUserResolver } from './shared/layout/resolvers/current-user.resolver';

const routes: Routes = [
    {
        path: '',
        component: LoggedInComponent,
        canActivate: [LoggedInGuard],
        resolve: { currentUser: CurrentUserResolver },
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
        ]
    },
    {
        path: 'login',
        loadChildren: './pages/auth/login-page/login-page.module#LoginPageModule',
    },
    {
        path: 'register',
        loadChildren: './pages/auth/register-page/register-page.module#RegisterPageModule',
    },
    { path: '**', redirectTo: 'news' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
