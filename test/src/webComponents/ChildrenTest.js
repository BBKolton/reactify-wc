export class ChildrenTest extends HTMLElement {
  static get template() {
    const temp = document.createElement("template");
    temp.innerHTML = `
    <p>A paragraph tag</p>
    <slot></slot>
    <p>A second paragraph tag</p>
    `;
    return temp;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(ChildrenTest.template.content.cloneNode(true));
  }
}

window.customElements.define("children-test", ChildrenTest);
export const ChildrenTestElement = () =>
  document.createElement("children-test");
export default ChildrenTestElement;
