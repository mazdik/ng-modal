import {
    ChangeDetectorRef,
    Directive,
    EmbeddedViewRef,
    OnChanges,
    OnInit,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';

@Directive({
    selector: '[modalInject]',
    exportAs: 'modalInject'
})
export class ModalInjectDirective implements OnInit, OnChanges {
    templateView?: EmbeddedViewRef<any>;
    private _modal?: ModalComponent;
    constructor(
        private templateRef: TemplateRef<any>,
        private renderer: Renderer2,
        private viewContainerRef: ViewContainerRef,
        private cdr: ChangeDetectorRef
    ) {}
    ngOnChanges(changes: SimpleChanges): void {
      this.templateView?.detectChanges();
    }
    
    ngOnInit(): void {
    }

    private findModalParts(nodes: HTMLElement[]) {
        const header = nodes.filter(x => (x?.classList?.contains('app-modal-header') ?? false));
        const footer = nodes.filter(x => (x?.classList?.contains('app-modal-footer') ?? false));
        const body   = nodes.filter(x => (!x?.classList?.contains('app-modal-footer') &&
                                          !x?.classList?.contains('app-modal-header')));
        return [header, body, footer];
    }

    private _resultRx = new Subject<any | boolean | null>();
    get resultRx(): Observable<any | boolean | null> {
        return this._resultRx.asObservable();
    }
    get modal(): ModalComponent | undefined {
        return this._modal;
    }
    contentOptions?: {[key: string]: any};
    open(modalOptions?: {[key: string]: any }, contentOptions?: {[key: string]: any}): Observable<any | boolean | null> {
        this.templateView = this.viewContainerRef.createEmbeddedView(this.templateRef);
        let nodes = this.findModalParts(this.templateView.rootNodes);
        if(nodes.some(x => !x || x.length == 0)) {
            const childNodes = this.findModalParts(Array.from(this.templateView.rootNodes.flatMap(x => Array.from(x.children))));
            let inChildFound = false;
            if(nodes[0].length == 0 && childNodes[0].length > 0) { 
                nodes[0] = childNodes[0]; 
                inChildFound = true; 
            }
            if(nodes[2].length == 0 && childNodes[2].length > 0) { 
                nodes[2] = childNodes[2];
                inChildFound = true; 
            }
            if(childNodes[1].length > 0 && inChildFound) 
                nodes[1] = childNodes[1];
        }
        const wrapped = this.viewContainerRef.createComponent(ModalComponent, {
            projectableNodes: nodes
        });
        if(modalOptions) {
            Object.entries(modalOptions).forEach(x => { wrapped.setInput(x[0], x[1])});
        }
        if(contentOptions) {
            this.contentOptions = contentOptions;
        }
        this._modal = wrapped.instance;
        this.cdr.detectChanges();   
      //  this._modal!.open();
       // this._modal!.modalRoot?.calcBodyHeight();
       // this._modal?.onClose.pipe(take(1)).subscribe(x => {
        //    this.close();
        //})
        this.cdr.detectChanges();   
        //wrapped.instance.modalRoot?.moveOnTop();
        return this.resultRx;
    }

    close(result: any | boolean | null = null) {
        this._resultRx.next(result);
        //this._modal?.close();
        this.viewContainerRef.clear();
    }
}