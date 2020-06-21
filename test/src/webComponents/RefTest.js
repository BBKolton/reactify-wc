export class RefTest extends HTMLElement {
  static get template() {
    const temp = document.createElement("template");
    temp.innerHTML = `<p></p>`;
    return temp;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(RefTest.template.content.cloneNode(true));
  }
}

window.customElements.define("ref-test", RefTest);
export const RefTestElement = () => document.createElement("ref-test");
export default RefTestElement;
