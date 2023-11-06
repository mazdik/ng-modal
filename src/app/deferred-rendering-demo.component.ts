import { AfterViewInit, Component, Inject } from "@angular/core";
import { HOST_MODAL, ModalComponent } from "ng-modal-lib";

@Component({
    selector: 'app-deffered-rendering-demo',
    template: `
        <button class="dt-button" (click)="modalRoot.render()">Open modal</button>
        <app-modal #modalRoot
                [maximizable]="true"
                [inViewport]="true"
                [dontDestroyOnClose]="false">
        <ng-template #appModalHeader class="app-modal-header">Demo modal</ng-template>
        <ng-template #appModalBody class="app-modal-body">
           <app-deferred-rendering-content></app-deferred-rendering-content>
        </ng-template>
        <ng-template #appModalFooter class="app-modal-footer">
          <button class="dt-button dt-red">Delete</button>&nbsp;
          <button class="dt-button dt-green">Save</button>
          <button class="dt-button dt-blue" style="float: right;" (click)="modalRoot.hide()">Close</button>
        </ng-template>
      </app-modal>
    `,
    styles: [``]
})
export class DeferredRenderingDemoModalComponent {
    
}

@Component({
   selector: 'app-deferred-rendering-content',
  template: `
      <div style="height: 120px;">
        <h3>MODAL DIALOG</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
      </div>
      <div>
      <div *ngFor="let item of items"> 
          {{item}} <br />
      </div>
        Content Goes Here
      </div>
      <input />
   `,
   styles: []
})
export class DeferredRenderingContentComponent implements AfterViewInit {
  items = [1];

  constructor(@Inject(HOST_MODAL) private modal: ModalComponent) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => { 
      this.items.push(1, 2, 3);
      this.modal[0].setVisible();
    }, 1000)
  }
}