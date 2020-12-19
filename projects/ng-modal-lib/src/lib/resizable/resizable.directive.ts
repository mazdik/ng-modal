import {
  Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnDestroy, AfterViewInit
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isLeftButton, getEvent } from '../common/utils';
import { ResizableEvent } from './types';

@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective implements OnDestroy, AfterViewInit {

  @Input() south: boolean;
  @Input() east: boolean;
  @Input() southEast: boolean;
  @Input() ghost: boolean;
  @Input() southWest: boolean;
  @Input() west: boolean;
  @Input() northWest: boolean;
  @Input() north: boolean;
  @Input() northEast: boolean;

  @Output() resizeBegin: EventEmitter<any> = new EventEmitter();
  @Output() resizing: EventEmitter<ResizableEvent> = new EventEmitter();
  @Output() resizeEnd: EventEmitter<ResizableEvent> = new EventEmitter();

  element: HTMLElement;
  private subscription: Subscription;
  private newWidth: number;
  private newHeight: number;
  private newLeft: number;
  private newTop: number;
  private resizingS: boolean; // south
  private resizingE: boolean; // east
  private resizingSE: boolean; // south-east
  private resizingSW: boolean;
  private resizingW: boolean;
  private resizingNW: boolean;
  private resizingN: boolean;
  private resizingNE: boolean;

  private minWidth: number;
  private maxWidth: number;
  private minHeight: number;
  private maxHeight: number;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngAfterViewInit(): void {
    if (this.south) {
      this.createHandle('resize-handle-s');
    }
    if (this.east) {
      this.createHandle('resize-handle-e');
    }
    if (this.southEast) {
      this.createHandle('resize-handle-se');
    }
    if (this.southWest) {
      this.createHandle('resize-handle-sw');
    }
    if (this.west) {
      this.createHandle('resize-handle-w');
    }
    if (this.northWest) {
      this.createHandle('resize-handle-nw');
    }
    if (this.north) {
      this.createHandle('resize-handle-n');
    }
    if (this.northEast) {
      this.createHandle('resize-handle-ne');
    }
    const computedStyle = window.getComputedStyle(this.element);
    this.minWidth = parseFloat(computedStyle.minWidth);
    this.maxWidth = parseFloat(computedStyle.maxWidth);
    this.minHeight = parseFloat(computedStyle.minHeight);
    this.maxHeight = parseFloat(computedStyle.maxHeight);
  }

  ngOnDestroy(): void {
    this.destroySubscription();
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMousedown(event: MouseEvent | TouchEvent): void {
    if (!isLeftButton(event)) {
      return;
    }
    const classList = ((event.target) as HTMLElement).classList;
    const isSouth = classList.contains('resize-handle-s');
    const isEast = classList.contains('resize-handle-e');
    const isSouthEast = classList.contains('resize-handle-se');
    const isSouthWest = classList.contains('resize-handle-sw');
    const isWest = classList.contains('resize-handle-w');
    const isNorthWest = classList.contains('resize-handle-nw');
    const isNorth = classList.contains('resize-handle-n');
    const isNorthEast = classList.contains('resize-handle-ne');

    const evt = getEvent(event);
    const width = this.element.clientWidth;
    const height = this.element.clientHeight;
    const left = this.element.offsetLeft;
    const top = this.element.offsetTop;
    const screenX = evt.screenX;
    const screenY = evt.screenY;

    const isTouchEvent = event.type.startsWith('touch');
    const moveEvent = isTouchEvent ? 'touchmove' : 'mousemove';
    const upEvent = isTouchEvent ? 'touchend' : 'mouseup';

    if (isSouth || isEast || isSouthEast || isSouthWest || isWest || isNorthWest || isNorth || isNorthEast) {
      this.initResize(event, isSouth, isEast, isSouthEast, isSouthWest, isWest, isNorthWest, isNorth, isNorthEast);

      const mouseup = fromEvent(document, upEvent);
      this.subscription = mouseup
        .subscribe((ev: MouseEvent | TouchEvent) => this.onMouseup(ev));

      const mouseMoveSub = fromEvent(document, moveEvent)
        .pipe(takeUntil(mouseup))
        .subscribe((e: MouseEvent | TouchEvent) => this.move(e, width, height, top, left, screenX, screenY));

      this.subscription.add(mouseMoveSub);
    }
  }

  move(event: MouseEvent | TouchEvent, width: number, height: number, top: number, left: number, screenX: number, screenY: number): void {
    const evt = getEvent(event);
    const movementX = evt.screenX - screenX;
    const movementY = evt.screenY - screenY;

    this.newWidth = width - (this.resizingSW || this.resizingW || this.resizingNW ? movementX : -movementX);
    this.newHeight = height - (this.resizingNW || this.resizingN || this.resizingNE ? movementY : -movementY);
    this.newLeft = left + movementX;
    this.newTop = top + movementY;

    this.resizeWidth(evt);
    this.resizeHeight(evt);
  }

  onMouseup(event: MouseEvent | TouchEvent): void {
    this.endResize(event);
    this.destroySubscription();
  }

  private destroySubscription(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  private createHandle(edgeClass: string): void {
    const node = document.createElement('span');
    node.className = edgeClass;
    this.element.appendChild(node);
  }

  initResize(event: MouseEvent | TouchEvent,
    isSouth: boolean,
    isEast: boolean,
    isSouthEast: boolean,
    isSouthWest: boolean,
    isWest: boolean,
    isNorthWest: boolean,
    isNorth: boolean,
    isNorthEast: boolean) {
    if (isSouth) {
      this.resizingS = true;
    }
    if (isEast) {
      this.resizingE = true;
    }
    if (isSouthEast) {
      this.resizingSE = true;
    }
    if (isSouthWest) {
      this.resizingSW = true;
    }

    if (isWest) {
      this.resizingW = true;
    }

    if (isNorthWest) {
      this.resizingNW = true;
    }

    if (isNorth) {
      this.resizingN = true;
    }

    if (isNorthEast) {
      this.resizingNE = true;
    }
    this.element.classList.add('resizing');
    this.newWidth = this.element.clientWidth;
    this.newHeight = this.element.clientHeight;
    this.newLeft = this.element.offsetLeft;
    this.newTop = this.element.offsetTop;
    event.stopPropagation();
    this.resizeBegin.emit();
  }

  endResize(event: MouseEvent | TouchEvent): void {
    this.resizingS = false;
    this.resizingE = false;
    this.resizingSE = false;
    this.resizingSW = false;
    this.resizingW = false;
    this.resizingNW = false;
    this.resizingN = false;
    this.resizingNE = false;
    this.element.classList.remove('resizing');
    this.resizeEnd.emit({ event: getEvent(event), width: this.newWidth, height: this.newHeight });
  }

  resizeWidth(event: MouseEvent | Touch): void {
    const overMinWidth = !this.minWidth || this.newWidth >= this.minWidth;
    const underMaxWidth = !this.maxWidth || this.newWidth <= this.maxWidth;

    if (this.resizingSE || this.resizingE || this.resizingNE) {
      if (overMinWidth && underMaxWidth) {
        if (!this.ghost) {
          this.element.style.width = `${this.newWidth}px`;
        }
      }
    }
    if (this.resizingSW || this.resizingW || this.resizingNW) {
      if (overMinWidth && underMaxWidth) {
        this.element.style.left = `${this.newLeft}px`;
        this.element.style.width = `${this.newWidth}px`;
      }
    }
    this.resizing.emit({ event, width: this.newWidth, height: this.newHeight, direction: 'horizontal' });

  }

  resizeHeight(event: MouseEvent | Touch): void {
    const overMinHeight = !this.minHeight || this.newHeight >= this.minHeight;
    const underMaxHeight = !this.maxHeight || this.newHeight <= this.maxHeight;
    if (this.resizingSE || this.resizingS || this.resizingSW) {
      if (overMinHeight && underMaxHeight) {
        if (!this.ghost) {
          this.element.style.height = `${this.newHeight}px`;
        }
      }
    }

    if (this.resizingNW || this.resizingN || this.resizingNE) {
      if (overMinHeight && underMaxHeight) {
        if (!this.ghost) {
          this.element.style.top = `${this.newTop}px`;
          this.element.style.height = `${this.newHeight}px`;
        }
      }
    }
    this.resizing.emit({ event, width: this.newWidth, height: this.newHeight, direction: 'vertical' });
  }

}
