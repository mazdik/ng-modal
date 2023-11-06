import {
  Component, ElementRef, ViewChild, Input, Output, AfterViewChecked, HostListener, EventEmitter, ViewEncapsulation, ContentChild, TemplateRef, forwardRef, InjectionToken
} from '@angular/core';
import {ResizableEvent} from '../resizable/types';
import {maxZIndex, findAncestor} from '../common/utils';

export const HOST_MODAL = new InjectionToken<ModalComponent>('HOST_MODAL');

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: HOST_MODAL,
    useExisting: forwardRef(() => ModalComponent),
    multi: true
}]
})
export class ModalComponent implements AfterViewChecked {

  @Input() scrollTopEnable = true;
  @Input() resizeable = true;
  @Input() maximizable: boolean;
  @Input() backdrop = true;
  @Input() inViewport: boolean;
  @Input() dontDestroyOnClose = true;
  @Input() minHeight = 0;
  @Input() setFocus = true;
  @Output() openModal: EventEmitter<boolean> = new EventEmitter();
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('modalRoot', {static: false}) modalRoot: ElementRef;
  @ViewChild('modalBody', {static: false}) modalBody: ElementRef;
  @ViewChild('modalHeader', {static: false}) modalHeader: ElementRef;
  @ViewChild('modalFooter', {static: false}) modalFooter: ElementRef;
  @ViewChild('closeIcon', {static: false}) closeIcon: ElementRef;
  @ViewChild('overlay', {static: false}) overlay: ElementRef;
  @ContentChild('appModalBody', { descendants: true, static: true }) bodyTemplateRef: TemplateRef<any>;
  @ContentChild('appModalHeader', { descendants: true, static: true }) headerTemplateRef: TemplateRef<any>;
  @ContentChild('appModalFooter', { descendants: true, static: true }) footerTemplateRef: TemplateRef<any>;
  
  clearable = false;
  visible: boolean;
  rendered: boolean;
  executePostDisplayActions: boolean;
  maximized: boolean;
  preMaximizeRootWidth: number;
  preMaximizeRootHeight: number;
  preMaximizeBodyHeight: number;
  preMaximizePageX: number;
  preMaximizePageY: number;
  dragEventTarget: MouseEvent | TouchEvent;

  constructor(private element: ElementRef) {
  }

  ngAfterViewChecked(): void {
    if (this.executePostDisplayActions) {
      this.center();
      this.executePostDisplayActions = false;
    }
  }

  @HostListener('keydown.esc', ['$event'])
  onKeyDown(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.hide();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.executePostDisplayActions = true;
    this.center();
  }

  render() {
    this.executePostDisplayActions = true;
    this.rendered = true;
    setTimeout(() => {
      if(this.setFocus) {
        this.modalRoot.nativeElement.focus();
      }
      if (this.scrollTopEnable) {
        this.modalBody.nativeElement.scrollTop = 0;
      }
      this.openModal.next(true);
    }, 1);
  }
  show(): void {
    this.render();
    this.visible = true;
  }

  hide(): void {
    this.rendered = false;
    this.visible = false;
    this.closeModal.emit(true);
    this.focusLastModal();
  }

  center(): void {
    let elementWidth = this.modalRoot.nativeElement.offsetWidth;
    let elementHeight = this.modalRoot.nativeElement.offsetHeight;

    if (elementWidth === 0 && elementHeight === 0) {
      this.modalRoot.nativeElement.style.visibility = 'hidden';
      this.modalRoot.nativeElement.style.display = 'flex';
      elementWidth = this.modalRoot.nativeElement.offsetWidth;
      elementHeight = this.modalRoot.nativeElement.offsetHeight;
      this.modalRoot.nativeElement.style.display = 'none';
      this.modalRoot.nativeElement.style.visibility = 'visible';
    }

    const x = Math.max((window.innerWidth - elementWidth) / 2, 0);
    const y = Math.max((window.innerHeight - elementHeight) / 2, 0);

    this.modalRoot.nativeElement.style.left = x + 'px';
    this.modalRoot.nativeElement.style.top = y + 'px';
  }

  initDrag(event: MouseEvent | TouchEvent): void {
    if (event.target === this.closeIcon.nativeElement) {
      return;
    }
    if (!this.maximized) {
      this.dragEventTarget = event;
    }
  }

  onResize(event: ResizableEvent): void {
    if (event.direction === 'vertical') {
      this.calcBodyHeight();
    }
  }

  calcBodyHeight(): void {
    const diffHeight = this.modalHeader.nativeElement.offsetHeight + this.modalFooter.nativeElement.offsetHeight;
    const contentHeight = this.modalRoot.nativeElement.offsetHeight - diffHeight;
    this.modalBody.nativeElement.style.height = contentHeight + 'px';
    this.modalBody.nativeElement.style.maxHeight = 'none';
  }

  getMaxModalIndex(): number {
    return maxZIndex('.ui-modal');
  }

  focusLastModal(): void {
    const modal = findAncestor(this.element.nativeElement.parentElement, '.ui-modal');
    if (modal) {
      modal.focus();
    }
  }

  toggleMaximize(event): void {
    if (this.maximized) {
      this.revertMaximize();
    } else {
      this.maximize();
    }
    event.preventDefault();
  }

  resizeToContentHeight() {
    const bodyChildren = this.modalBody.nativeElement.children;
    const bodyRect = this.modalBody.nativeElement.getBoundingClientRect();
    if(!bodyChildren || bodyChildren.length == 0)
      return;
    const height = Math.max(...[...bodyChildren].map(x => x.getBoundingClientRect()).map(x => x.top + x.height - bodyRect.top));
    this.modalBody.nativeElement.style.height = height + 16 + 'px';
    this.modalBody.nativeElement.style.maxHeight = 'none';
  }
  maximize(): void {
    this.preMaximizePageX = parseFloat(this.modalRoot.nativeElement.style.top);
    this.preMaximizePageY = parseFloat(this.modalRoot.nativeElement.style.left);
    this.preMaximizeRootWidth = this.modalRoot.nativeElement.offsetWidth;
    this.preMaximizeRootHeight = this.modalRoot.nativeElement.offsetHeight;
    this.preMaximizeBodyHeight = this.modalBody.nativeElement.offsetHeight;

    this.modalRoot.nativeElement.style.top = '0px';
    this.modalRoot.nativeElement.style.left = '0px';
    this.modalRoot.nativeElement.style.width = '100vw';
    this.modalRoot.nativeElement.style.height = '100vh';
    const diffHeight = this.modalHeader.nativeElement.offsetHeight + this.modalFooter.nativeElement.offsetHeight;
    this.modalBody.nativeElement.style.height = 'calc(100vh - ' + diffHeight + 'px)';
    this.modalBody.nativeElement.style.maxHeight = 'none';

    this.maximized = true;
  }

  revertMaximize(): void {
      this.modalRoot.nativeElement.style.top = this.preMaximizePageX + 'px';
      this.modalRoot.nativeElement.style.left = this.preMaximizePageY + 'px';
      this.modalRoot.nativeElement.style.width = this.preMaximizeRootWidth + 'px';
      this.modalRoot.nativeElement.style.height = this.preMaximizeRootHeight + 'px';
      this.modalBody.nativeElement.style.height = this.preMaximizeBodyHeight + 'px';

      this.maximized = false;
  }

  moveOnTop(): void {
      const maxModalIndex = this.getMaxModalIndex();
      let zIndex = parseFloat(window.getComputedStyle(this.modalRoot.nativeElement).zIndex) || 0;
      if (zIndex <= maxModalIndex) {
        zIndex = maxModalIndex + 1;
        this.overlay.nativeElement.style.zIndex = zIndex.toString();
        this.modalRoot.nativeElement.style.zIndex = (zIndex + 1).toString();
      }
  }

  setVisible(visible: boolean = true) {
    this.visible = visible;
  }
}
