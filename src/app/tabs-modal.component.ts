import { Component } from '@angular/core';

@Component({
  selector: 'app-tab-modal',
  template: `
    <button class="dt-button" (click)="modalRoot.show()">Open modal</button>
    <app-modal [minHeight]="500" #modalRoot class="tab-modal-demo1">
      
      <ng-container class="app-modal-header">Demo modal</ng-container>
        <ng-container class="app-modal-body">
            <mat-tab-group>
              <mat-tab label="First"> 
                  <div style="height: 120px;">
                    <h3>MODAL DIALOG</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
                  </div>
                  <input />
              </mat-tab>
              <mat-tab label="Second">
                Content 2 
                <mat-slide-toggle>Toggle me!</mat-slide-toggle>            
              </mat-tab>
              <mat-tab label="Third"> Content 3 </mat-tab>
          </mat-tab-group>
          </ng-container>
        <ng-container class="app-modal-footer">
          <button class="dt-button dt-red">Delete</button>&nbsp;
          <button class="dt-button dt-blue" style="float: right;" (click)="modalRoot.hide()">Close</button>
        </ng-container>
    </app-modal>
  `,
})
export class TabsModalComponent {

}
