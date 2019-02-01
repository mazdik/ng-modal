export function isLeftButton(event: MouseEvent | TouchEvent) {
  return (event.type === 'mousedown' && (<MouseEvent>event).which === 1);
}

export function getEvent(event: MouseEvent | TouchEvent): MouseEvent | Touch {
  if (event.type === 'touchend' || event.type === 'touchcancel') {
    return (<TouchEvent>event).changedTouches[0];
  }
  return event.type.startsWith('touch') ? (<TouchEvent>event).targetTouches[0] : <MouseEvent>event;
}
