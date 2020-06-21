import {
  RefObject,
  Component,
  createRef,
  createElement,
  ReactNode,
} from "react";
import { Options } from "./types";

const reactifyWebComponent = <Props>(
  WC: string,
  { forceProperty = [], forceAttribute = [], forceEvent = [] }: Options = {
    forceProperty: [],
    forceAttribute: [],
    forceEvent: [],
  }
) => {
  return class extends Component {
    props: Props & { style?: Object; children?: ReactNode };
    eventHandlers: [string, Function][];
    ref: RefObject<HTMLElement>;

    constructor(props) {
      super(props);
      this.eventHandlers = [];
      this.ref = createRef<HTMLElement>();
    }

    setProperty(prop: string, val: any) {
      this.ref.current[prop] = val;
    }

    setAttribute(prop: string, val: string | boolean | number) {
      if (val === false) return this.ref.current.removeAttribute(prop);
      this.ref.current.setAttribute(prop, val.toString());
    }

    setEvent(event: string, val: Function) {
      this.eventHandlers.push([event, val]);
      this.ref.current.addEventListener(event, val as EventListener);
    }

    update() {
      this.clearEventHandlers();
      Object.entries(this.props).forEach(([prop, val]: [string, any]) => {
        // Check to see if we're forcing the value into a type, and don't
        // proceed if we force
        let forced: boolean = false;
        if (forceProperty.includes(prop)) {
          this.setProperty(prop, val);
          forced = true;
        }
        if (forceAttribute.includes(prop)) {
          this.setAttribute(prop, val);
          forced = true;
        }
        if (forceEvent.includes(prop)) {
          this.setEvent(prop, val);
          forced = true;
        }
        if (forced) return;
        if (prop === "style") return;
        // We haven't forced the type, so determine the correct typing and
        // assign the value to the right place
        if (prop === "children") {
          return undefined;
        }
        if (prop.toLowerCase() === "classname") {
          return (this.ref.current.className = val as string);
        }
        if (
          typeof val === "string" ||
          typeof val === "number" ||
          typeof val === "boolean"
        ) {
          this.setProperty(prop, val);
          this.setAttribute(prop, val);
          return;
        }
        if (typeof val === "function") {
          if (prop.match(/^on[A-Z]/)) {
            return this.setEvent(prop[2].toLowerCase() + prop.substr(3), val);
          }
          if (prop.match(/^on\-[a-z]/)) {
            return this.setEvent(prop.substr(3), val);
          }
        }
        this.setProperty(prop, val);
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
        this.ref.current.removeEventListener(event, handler as EventListener);
      });
      this.eventHandlers = [];
    }

    render() {
      const { children, style } = this.props;
      return createElement(WC, { ref: this.ref, style }, children);
    }
  };
};

export default reactifyWebComponent;
