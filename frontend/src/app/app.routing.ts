import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ExamplePageComponent } from './pages/example-page/example-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RoleGuardService } from './services/role-guard.service';
import { AddBonusPageComponent } from './pages/salesman-page/bonus-page/add-bonus-page/add-bonus-page.component';
import { CeoBonusComponent } from './pages/ceobonus-page/ceobonus-page.component';
import { CeoBonusDetailComponent } from './pages/ceobonus-page/ceobonusdetail-page/ceobonusdetail-page.component';
import { BonusPageComponent } from './pages/salesman-page/bonus-page/bonus-page.component';
import { SalesmanPageComponent } from './pages/salesman-page/salesman-page.component'; /*
  This array holds the relation of paths and components which angular router should resolve.

  If you want add a new page with a separate path/subdirectory you should register it here.
  It is also possible to read parameters from the path they have to be specified with ':' in the path.

  If a new page should also show up in the menu bar, you need to add it there too.
  Look at: frontend/src/app/components/menu-bar/menu-bar.component.ts
 */

/*
  This array holds the relation of paths and components which angular router should resolve.

  If you want add a new page with a separate path/subdirectory you should register it here.
  It is also possible to read parameters from the path they have to be specified with ':' in the path.

  If a new page should also show up in the menu bar, you need to add it there too.
  Look at: frontend/src/app/components/menu-bar/menu-bar.component.ts
 */
export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    {
        path: 'example',
        component: ExamplePageComponent,
        canActivate: [AuthGuardService, RoleGuardService],
    },
    {
        path: 'salesman',
        component: SalesmanPageComponent,
        canActivate: [AuthGuardService, RoleGuardService],
    },
    {
        path: 'salesman/bonus',
        component: BonusPageComponent,
        canActivate: [AuthGuardService, RoleGuardService],
    },
    {
        path: 'salesman/bonus/add-bonus',
        component: AddBonusPageComponent,
        canActivate: [AuthGuardService, RoleGuardService],
    },
    {
        path: 'ceobonus',
        component: CeoBonusComponent,
        canActivate: [AuthGuardService, RoleGuardService],
    },
    {
        path: 'ceobonus/ceobonusdetail',
        component: CeoBonusDetailComponent,
        canActivate: [AuthGuardService, RoleGuardService],
    },
    {
        path: '',
        component: LandingPageComponent,
        canActivate: [AuthGuardService],
    },
    { path: '**', component: NotFoundPageComponent }, // these entries are matched from top to bottom => not found should be the last entry
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRouting {}
