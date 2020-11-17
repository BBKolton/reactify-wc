import React, {
  RefObject,
  createRef,
  forwardRef,
  CSSProperties,
  useEffect,
  FunctionComponent,
  PropsWithoutRef,
} from 'react';

interface Options {
  forceProperty?: string[];
  forceAttribute?: string[];
  forceEvent?: string[];
}
type PropKey = keyof HTMLElement | string;

const REFERENCE_ERR_MESSAGE =
  'Reference component not defined. Operation cannot be done';

const reactifyWebComponent = <Props,>(
  WC: string,
  { forceProperty = [], forceAttribute = [], forceEvent = [] }: Options = {
    forceProperty: [],
    forceAttribute: [],
    forceEvent: [],
  }
) => {
  type CombinedProps = Props & {
    innerRef?: RefObject<HTMLElement>;
    style?: CSSProperties;
    src?: string;
  };

  const Reactified: FunctionComponent<CombinedProps> = (props) => {
    const { innerRef } = props;
    const ref = innerRef || createRef<HTMLElement>();
    const eventHandlers: [string, Function][] = [];

    useEffect(() => {
      update();
      return () => clearEventHandlers();
    }, [props]);

    const setProperty = (prop: PropKey, val: any) => {
      if (ref.current) {
        ref.current.setAttribute(prop, val);
      } else {
        console.warn(REFERENCE_ERR_MESSAGE);
      }
    };

    const setAttribute = (prop: PropKey, val: string | boolean | number) => {
      if (ref.current) {
        if (val === false) {
          return ref.current.removeAttribute(prop);
        }
        ref.current.setAttribute(prop, val.toString());
      } else {
        console.warn(REFERENCE_ERR_MESSAGE);
      }
    };

    const setEvent = (event: string, val: Function) => {
      if (ref.current) {
        eventHandlers.push([event, val]);
        ref.current.addEventListener(event, val as EventListener);
      } else {
        console.warn(REFERENCE_ERR_MESSAGE);
      }
    };

    const update = () => {
      clearEventHandlers();
      Object.entries(props).forEach(([prop, val]: [PropKey, any]) => {
        // Check to see if we're forcing the value into a type, and don't
        // proceed if we force
        let forced: boolean = false;
        if (forceProperty.includes(prop)) {
          setProperty(prop, val);
          forced = true;
        }
        if (forceAttribute.includes(prop)) {
          setAttribute(prop, val);
          forced = true;
        }
        if (forceEvent.includes(prop)) {
          setEvent(prop, val);
          forced = true;
        }
        if (forced) return;
        if (prop === 'style') return;
        // We haven't forced the type, so determine the correct typing and
        // assign the value to the right place
        if (prop === 'children') {
          return undefined;
        }
        if (prop.toLowerCase() === 'classname') {
          if (ref.current) {
            ref.current.className = val.toString();
          } else {
            console.warn(REFERENCE_ERR_MESSAGE);
          }
          return;
        }
        if (
          typeof val === 'string' ||
          typeof val === 'number' ||
          typeof val === 'boolean'
        ) {
          setProperty(prop, val);
          setAttribute(prop, val);
          return;
        }
        if (typeof val === 'function') {
          if (prop.match(/^on[A-Z]/)) {
            return setEvent(prop[2].toLowerCase() + prop.substr(3), val);
          }
          if (prop.match(/^on\-[a-z]/)) {
            return setEvent(prop.substr(3), val);
          }
        }
        setProperty(prop, val);
      });
    };

    const clearEventHandlers = () => {
      if (ref.current) {
        eventHandlers.forEach(([event, handler]) => {
          ref.current &&
            ref.current.removeEventListener(event, handler as EventListener);
        });
        // make "eventHandlers" constant array empty: https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
        eventHandlers.length = 0;
      } else {
        console.warn(REFERENCE_ERR_MESSAGE);
      }
    };

    return (
      <WC
        {...({
          ref,
          style: props.style,
          children: props.children,
          src: props.src,
        } as React.ComponentProps<any> & Props)}
      />
    );
  };

  return forwardRef<any, PropsWithoutRef<Props>>((props, ref) => (
    <Reactified {...({ innerRef: ref, ...props } as CombinedProps)} />
  ));
};

export default reactifyWebComponent;
