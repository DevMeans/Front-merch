import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,

    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
