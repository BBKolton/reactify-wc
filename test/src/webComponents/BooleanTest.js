export class BooleanTest extends HTMLElement {
  static get template() {
    const temp = document.createElement("template");
    temp.innerHTML = `
    <p>T/F State:  
      <span class="boolean"></span>
    </p>`;
    return temp;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(BooleanTest.template.content.cloneNode(true));
    this.setBoolean();
  }

  setBoolean() {
    this.shadowRoot.querySelector(".boolean").innerText = this.boolean;
  }

  static get observedAttributes() {
    return ["boolean"];
  }

  get boolean() {
    return this.getAttribute("boolean");
  }

  set boolean(value) {
    return this.setAttribute("boolean", value);
  }

  attributeChangedCallback(attribute) {
    switch (attribute.toLowerCase()) {
      case "boolean":
        return this.setBoolean();
    }
  }
}

window.customElements.define("boolean-test", BooleanTest);
export const BooleanTestElement = () => document.createElement("boolean-test");
export default BooleanTestElement;
