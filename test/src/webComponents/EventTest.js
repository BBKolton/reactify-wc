export class ChildrenTest extends HTMLElement {
  static get template() {
    const temp = document.createElement("template");
    temp.innerHTML = `
    <vaadin-button class="thrower">Throw a "thing" event</vaadin-button>
    `;
    return temp;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(ChildrenTest.template.content.cloneNode(true));
    this.setEventThrower();
  }

  setEventThrower() {
    this.shadowRoot.querySelector(".thrower").addEventListener("click", () => {
      const event = new CustomEvent("thing", {
        detail: "Custom Element event details!",
        bubbles: true,
      });
      this.dispatchEvent(event);
    });
  }
}

window.customElements.define("event-test", ChildrenTest);
export const ChildrenTestElement = () => document.createElement("event-test");
export default ChildrenTestElement;
