import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRouting, routes} from "./app.routing";
import {AppComponent} from "./app.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {LoginComponent} from "./components/login/login.component";
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MenuBarComponent} from "./components/menu-bar/menu-bar.component";
import {ExamplePageComponent} from "./pages/example-page/example-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {MatTableModule} from "@angular/material/table";
import {EmployeeListPageComponent} from "./pages/employee-list-page/employee-list-page.component";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {EmployeeDetailsComponent} from "./pages/employee-details/employee-details.component";
import {provideRouter, withComponentInputBinding} from "@angular/router";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginComponent,
    LandingPageComponent,
    MenuBarComponent,
    ExamplePageComponent,
    NotFoundPageComponent,
    EmployeeListPageComponent,
    EmployeeDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideRouter(routes, withComponentInputBinding()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
