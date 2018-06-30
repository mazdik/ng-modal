import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalComponent } from '../ng-modal/modal.component';


import { AppComponent } from './app.component';
import { ModalDemoComponent } from './modal-demo.component';
import { NestedModalDemoComponent } from './nested-modal-demo.component';
import { PanelDemoComponent } from './panel-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ModalDemoComponent,
    NestedModalDemoComponent,
    PanelDemoComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
