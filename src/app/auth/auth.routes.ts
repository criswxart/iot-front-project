import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { LoginComponent } from "./pages/login/login.component";
import { IsAdminGuard } from "./guards/is-admin.guard";

export const authRoutes: Routes = [

    {
        path:'',
        component: AuthLayoutComponent,
        // canMatch: [IsAdminGuard ],
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: '**',
                redirectTo: 'login'
            }

        ]
    }
];
