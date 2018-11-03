import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AccountComponent } from './components/account/account.component';
import { IdentityService } from './services/identity.service';
import { AuthorizationGuard } from './guards/authorization.guard';
import { TranslatePipe } from './pipe/translate.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TranslateTransformPipe } from './pipe/translatepipetransform.pipe';

export function setupTranslatefactory (service: TranslatePipe): Function {
    return () => service.use ('en');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavBarComponent,
    AccountComponent,
    TranslateTransformPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'account', component: AccountComponent, canActivate: [AuthorizationGuard] },
      {path: '**', redirectTo: ''}
    ]),
    HttpClientModule
  ],
  providers: [
    IdentityService,
    AuthorizationGuard,
    HttpClientModule,
    TranslatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslatefactory,
      deps: [TranslatePipe],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
