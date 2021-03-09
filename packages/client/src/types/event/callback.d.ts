interface PointerEventCallbacks {
  onPointerEnter?(this: unknown, ev: PointerEvent): void
  onPointerMove?(this: unknown, ev: PointerEvent): void
  onPointerLeave?(this: unknown, ev: PointerEvent): void
}
