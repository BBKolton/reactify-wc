import { RefObject, Component, createRef, createElement } from "react";

const reactifyWebComponent = (WC: string) => {
  return class extends Component {
    props: any;
    eventHandlers: [string, Function][];
    ref: RefObject<HTMLElement>;

    constructor(props) {
      super(props);
      this.eventHandlers = [];
      this.ref = createRef<HTMLElement>();
    }

    update() {
      this.clearEventHandlers();
      Object.entries(this.props).forEach(([prop, val]) => {
        if (prop === "children") {
          return undefined;
        }
        if (prop.toLowerCase() === "classname") {
          return (this.ref.current.className = val);
        }
        if (typeof val === "function" && prop.match(/^on[A-Z]/)) {
          const event = prop[2].toLowerCase() + prop.substr(3);
          this.eventHandlers.push([event, val]);
          return this.ref.current.addEventListener(event, val);
        }
        if (typeof val === "string" || typeof val === "number") {
          return this.ref.current.setAttribute(prop, val);
        }
        if (typeof val === "boolean") {
          if (val) {
            return this.ref.current.setAttribute(prop, val);
          }
          return this.ref.current.removeAttribute(prop);
        }
        this.ref.current[prop] = val;
        return undefined;
      });
    }

    componentDidUpdate() {
      this.update();
    }

    componentDidMount() {
      this.update();
    }

    componentWillUnmount() {
      this.clearEventHandlers();
    }

    clearEventHandlers() {
      this.eventHandlers.forEach(([event, handler]) => {
        this.ref.current.removeEventListener(event, handler);
      });
      this.eventHandlers = [];
    }

    render() {
      const { children } = this.props;
      return createElement(WC, { ref: this.ref }, children);
    }
  };
};

export default reactifyWebComponent;
