# Angular 5 Resizable and draggable Modal

Simple Resizable and draggable modal component.
 (<a target="_blank" href="https://mazdik.github.io/ng-modal/">Demo</a>) 

### Sample
```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'app-modal-demo',
  template: `
    <button type="button" class="button" (click)="modalRoot.show()">Open modal</button>
    <app-modal #modalRoot
               [modalTitle]="'Demo modal'"
               [width]="500"
               [zIndex]="1100"
               [autoZIndex]="false"
               (close)="onCloseModal()">
      <ng-container class="app-modal-body">
        <h3>MODAL DIALOG</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
      </ng-container>
      <ng-container class="app-modal-footer">
        <button type="button" class="button button3" (click)="modalRoot.hide()">Delete</button>
        <button type="button" class="button button1" (click)="modalRoot.hide()">Save</button>
        <button type="button" class="button button2" style="float: right;" (click)="modalRoot.hide()">Close</button>
      </ng-container>
    </app-modal>
  `
})
export class ModalDemoComponent {

  onCloseModal() {
  }

}
```

### Properties

| Attribute        | Type       | Default | Description |
|------------------|------------|---------|-------------|
| modalTitle       | string     | null    |             |
| width            | any        | null    |             |
| zIndex           | number     | null    |             |
| minWidth         | number     | 260     |             |
| minHeight        | number     | 200     |             |
| scrollTop        | boolean    | true    |             |
| maximizable      | boolean    | false   |             |
| backdrop         | boolean    | true    |             |
| styleClass       | string     | null    |             |
