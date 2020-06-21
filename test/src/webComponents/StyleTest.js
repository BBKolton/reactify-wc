export class StyleTest extends HTMLElement {
  static get template() {
    const temp = document.createElement("template");
    temp.innerHTML = `
    <p><slot></slot></p>
    `;
    return temp;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(StyleTest.template.content.cloneNode(true));
  }
}

window.customElements.define("style-test", StyleTest);
export const StyleTestElement = () => document.createElement("style-test");
export default StyleTestElement;
