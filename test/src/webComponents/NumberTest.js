export class NumberTest extends HTMLElement {
  static get template() {
    const temp = document.createElement("template");
    temp.innerHTML = `
    <p>Your lucky number:  
      <span class="number"></span>!
    </p>`;
    return temp;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(NumberTest.template.content.cloneNode(true));
    this.setNumber();
  }

  setNumber() {
    this.shadowRoot.querySelector(".number").innerText = this.number;
  }

  static get observedAttributes() {
    return ["number"];
  }

  get number() {
    return this.getAttribute("number");
  }

  set number(value) {
    return this.setAttribute("number", value);
  }

  attributeChangedCallback(attribute) {
    switch (attribute.toLowerCase()) {
      case "number":
        return this.setNumber();
    }
  }
}

window.customElements.define("number-test", NumberTest);
export const NumberTestElement = () => document.createElement("number-test");
export default NumberTestElement;
