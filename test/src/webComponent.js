import { html, render } from "lit-html";

class WebComponent extends HTMLElement {
  constructor(...all) {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const div = document.createElement("div");
    div.classList.add("button-wrapper");

    const button = document.createElement("button");
    button.innerText = this.children;

    shadow.appendChild(div);
    div.appendChild(button);
  }

  connectedCallback() {
    console.log(this.getAttributeNames());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log({ name, oldValue, newValue });
  }

  static get observedAttributes() {
    return ["somestring", "customfunction"];
  }
}

customElements.define("web-component", WebComponent);
