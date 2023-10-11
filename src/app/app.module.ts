import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ng-modal-lib';
import { AppComponent } from './app.component';
import { ModalDemoComponent } from './modal-demo.component';
import { PanelDemoComponent } from './panel-demo.component';
import { NestedModalDemoComponent } from './nested-modal-demo.component copy';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsModalComponent } from './tabs-modal.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    ModalDemoComponent,
    NestedModalDemoComponent,
    PanelDemoComponent,
    TabsModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ModalModule,
    MatTabsModule,
    MatSlideToggleModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
