import {Component} from '@angular/core';

@Component({
  selector: 'app-nested-modal-demo',
  template: `
    <button type="button" class="button" (click)="modalRoot.show()">Open modal</button>
    <app-modal #modalRoot
               [modalTitle]="'Modal 1'"
               [width]="600"
               [zIndex]="zIndex">
      <ng-container class="app-modal-body">
        <h3>MODAL DIALOG</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>

        <button type="button" class="button" (click)="childModal.show()">Open modal</button>
        <app-modal #childModal
                   [modalTitle]="'Modal 2'"
                   [width]="550"
                   [zIndex]="zIndex+2">
          <ng-container class="app-modal-body">
            <h3>MODAL DIALOG</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
            <app-modal-demo [zIndex]="zIndex+4"></app-modal-demo>
          </ng-container>
          <ng-container class="app-modal-footer">
            <button type="button" class="button button3">Delete</button>&nbsp;
            <button type="button" class="button button1">Save</button>
            <button type="button" class="button button2" style="float: right;" (click)="childModal.hide()">Close
            </button>
          </ng-container>
        </app-modal>

      </ng-container>
      <ng-container class="app-modal-footer">
        <button type="button" class="button button3">Delete</button>&nbsp;
        <button type="button" class="button button1">Save</button>
        <button type="button" class="button button2" style="float: right;" (click)="modalRoot.hide()">Close</button>
      </ng-container>
    </app-modal>
  `
})
export class NestedModalDemoComponent {

  zIndex: number = 1;

}
