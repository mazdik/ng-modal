import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ng-modal-lib';

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
  bootstrap: [AppComponent]
})
export class AppModule { }
