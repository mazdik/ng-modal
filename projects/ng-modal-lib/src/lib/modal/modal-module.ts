import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from './modal.component';
import {ResizableModule} from '../resizable/resizable-module';
import {DraggableModule} from '../draggable/draggable-module';
import { ModalInjectDirective } from '../injectable/injectable.directive';

@NgModule({
  imports: [
    CommonModule,
    ResizableModule,
    DraggableModule,
  ],
  declarations: [
    ModalComponent,
    ModalInjectDirective
  ],
  exports: [
    ModalComponent,
  ]
})
export class ModalModule {}
