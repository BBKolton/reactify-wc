export class StringTest extends HTMLElement {
  static get template() {
    const temp = document.createElement("template");
    temp.innerHTML = `
    <p>Hello 
      <span class="string"></span>!
    </p>`;
    return temp;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(StringTest.template.content.cloneNode(true));
    this.setString();
  }

  setString() {
    this.shadowRoot.querySelector(".string").innerText = this.string;
  }

  static get observedAttributes() {
    return ["string"];
  }

  get string() {
    return this.getAttribute("string");
  }

  set string(value) {
    return this.setAttribute("string", value);
  }

  attributeChangedCallback(attribute) {
    switch (attribute.toLowerCase()) {
      case "string":
        return this.setString();
    }
  }
}

window.customElements.define("string-test", StringTest);
export const StringTestElement = () => document.createElement("string-test");
export default StringTestElement;
