import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from '../ng-modal';


import { AppComponent } from './app.component';
import { ModalDemoComponent } from './modal-demo.component';
import { NestedModalDemoComponent } from './nested-modal-demo.component';
import { PanelDemoComponent } from './panel-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalDemoComponent,
    NestedModalDemoComponent,
    PanelDemoComponent,
  ],
  imports: [
    BrowserModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
