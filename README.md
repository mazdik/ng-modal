# Angular resizable and draggable modal

Simple resizable and draggable modal component. (<a target="_blank" href="https://mazdik.github.io/ng-modal/">Demo</a>)

<a target="_blank" href="https://github.com/mazdik/web-modal">version in vanilla js</a>

```
npm i ng-modal-lib --save
```

### Sample
```typescript
import { ModalModule } from 'ng-modal-lib';

@NgModule({
  imports: [
    ModalModule
  ]
})
```

```html
<button type="button" class="button" (click)="modalRoot.show()">Open modal</button>
<app-modal #modalRoot class="modal-demo">
  <ng-container class="app-modal-header">Demo modal</ng-container>
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
  /* for resize limits use min-width, min-height, max-width, max-height in css */
}
.modal-demo .ui-modal-overlay, .modal-demo .ui-modal {
  z-index: 10;
}
/* colors */
:root {
  --dt-color-primary: #5b9bd5;
}
/* for IE */
.ui-modal-header {
  background-color: #5b9bd5;
}
```

### Properties

| Attribute        | Type       | Default | Description |
|------------------|------------|---------|-------------|
| scrollTopEnable  | boolean    | true    |             |
| maximizable      | boolean    | false   |             |
| backdrop         | boolean    | true    |             |
