/** Deprecate what we know will break Vue's prerendering/hydration */
interface ParentNode {
  /** @deprecated This has the potential to break Vue's hydration */
  querySelector<E extends Element = Element>(selectors: string): E | null;
  /** @deprecated This has the potential to break Vue's hydration */
  querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
}

declare interface ChildNode {
  /** @deprecated  */
  remove(): void
}
