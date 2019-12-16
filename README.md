# Angular resizable and draggable modal

Simple resizable and draggable modal component.
 (<a target="_blank" href="https://mazdik.github.io/ng-modal/">Demo</a>) 

### Sample
```typescript
import { ModalModule } from '../lib/modal/modal-module';

@NgModule({
  imports: [
    ModalModule
  ]
})
```

```html
<button type="button" class="button" (click)="modalRoot.show()">Open modal</button>
<app-modal #modalRoot
           class="modal-demo"
           [modalTitle]="'Demo modal'"
           [zIndex]="1100"
           (closeModal)="onCloseModal()">
  <ng-container class="app-modal-body">
    <h3>MODAL DIALOG</h3>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
  </ng-container>
  <ng-container class="app-modal-footer">
    <button type="button" class="button button3" (click)="modalRoot.hide()">Delete</button>
    <button type="button" class="button button1" (click)="modalRoot.hide()">Save</button>
    <button type="button" class="button button2" style="float: right;" (click)="modalRoot.hide()">Close
    </button>
  </ng-container>
</app-modal>
```

```css
.modal-demo .ui-modal {
  width: 37.5rem;
}
```
For resize limits use min-width, min-height, max-width, max-height in css.

### Properties

| Attribute        | Type       | Default | Description |
|------------------|------------|---------|-------------|
| modalTitle       | string     | null    |             |
| zIndex           | number     | null    |             |
| scrollTopEnable  | boolean    | true    |             |
| maximizable      | boolean    | false   |             |
| backdrop         | boolean    | true    |             |
