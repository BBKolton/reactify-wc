import { createUniqueTag } from './createUniqueTag';

export type Constructor<T> = {
    // tslint:disable-next-line:no-any
    new (...args: any[]): T
  };
  
/**
 * Defines a custom element
 *
 * @param {string} tagName
 * @param {HTMLElement} klass
 * @param {CustomElementRegistry} registry
 */
function defineElement(tagName: string, klass: Constructor<HTMLElement>, registry: CustomElementRegistry = customElements) {
  registry.define(tagName, class extends klass {});
}

/**
 * Define a scoped custom element storing the scoped tag name in the cache
 *
 * @param {string} tagName
 * @param {HTMLElement} klass
 * @returns {string}
 */
export function registerElement(tagName: string, klass: any): string {
  const registry = customElements;

  if (klass === customElements.get(tagName)) {
    return tagName;
  }

  const tag = createUniqueTag(tagName, registry);
  // @ts-ignore
  // we extend it just in case the class has been defined manually
  defineElement(tag, klass, registry);

  return tag;
}
