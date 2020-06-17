export class PropertyTest extends HTMLElement {
  state = {};

  static get template() {
    const temp = document.createElement("template");
    temp.innerHTML = `<pre class="property"></pre>`;
    return temp;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(PropertyTest.template.content.cloneNode(true));
    this.setProperty();
  }

  setProperty() {
    this.shadowRoot.querySelector(".property").innerText = JSON.stringify(
      this.property,
      null,
      2
    );
  }

  static get observedAttributes() {
    return ["property"];
  }

  get property() {
    return this.state;
  }

  set property(value) {
    this.state = value;
    this.setProperty();
  }
}

window.customElements.define("property-test", PropertyTest);
export const PropertyTestElement = () =>
  document.createElement("property-test");
export default PropertyTestElement;
