_A Mercedes-Benz R&D North America, Seattle HUB contribution_

# Reactify Web Component

Use web components with React properties and functions

# Usage

```jsx
import React from "react";
import reactifyWc from "reactify-wc";

// Import your web component. This one defines a tag called 'vaadin-button'
import "@vaadin/vaadin-button";

const onClick = () => console.log("hello world");

const VaadinButton = reactifyWc("vaadin-button");

export const MyReactComponent = () => (
  <>
    <h1>Hello world</h1>
    <VaadinButton onClick={onClick}>Click me!</VaadinButton>
  </>
);
```

# Children, Props, Attributes, Functions, and Events

React does not handle properties and functions correctly for web components.
This factory function returns a new React component for a given web component so
you can use them.

## Children

Children are dropped directly into the web component like normal.

## Properties and Attributes

`reactify-wc` checks the passed properties by type to determine where they
should go. `string`s, `number`s, and `boolean`s are set as attributes on the web
component. All other data besides functions that have a property name that begin
with `/^on[A-Z]/` and `children` are set as props.

## Functions / Events

Any `function` that has a property name that starts with `on[A-Z]` (any string
that starts with 'o', 'n', and any uppercase letter) is truncated and the first
char `toLowerCased` before passing to `addEventListener`. This effectively means
`onClick` becomes a handler for the `click` event. This is to make things easy
when handling most React synthetic events which typically have direct DOM
companions by name. You can target kebab-cased custom events in the same way,
like `onMy-kebab-event` -> `my-kebab-event`. `function` properties that do not
start with `on[A-Z]` are added as props. Observe the example below:

```jsx
const Example = () => (
  <VaadinButton onClick={handleClick}>Click</VaadinButton>
  // calls addEventListener('click', handleClick)
  // The 'on' prefix is truncated, and the next char lowercased

  <VaadinButton functionalProp={functionalProp}>Click</VaadinButton>
  // adds a prop 'functionalProp' -> functionalProp
)

```

Events passed into the event handlers are browser events, not React
SyntheticEvents.

# Composability Details

Many web components are "composable," meaning that in order to get a desired
functionality, you may need to put multiple tags together or inside one another.
Technically speaking, when using `reactify-wc`, only top level web components
and components that have direct React integration need to be reactified. For
readability and ease of use, we recommend reactifying all web components if
possible.

```jsx
// Preferred method

const VaadinGrid = reactifyWc("vaadin-grid");
const VaadinGridColumn = reactifyWc("vaadin-grid-column");

const MyReactComponent = () => (
  <VaadinGrid items={items}>
    <VaadinGridColumn path="name.first" header="First name" onClick={onClick} />
    <VaadinGridColumn path="name.last" header="Last name" />
  </VaadinGrid>
);
```

```jsx
// Will work, not preferred

const VaadinGrid = reactifyWc("vaadin-grid");

const MyReactComponent = () => (
  <VaadinGrid items={items}>
    <vaadin-grid-column path="name.first" header="First name" />
    <vaadin-grid-column path="name.last" header="Last name" />
  </vaadin-grid>
);
```

```jsx
// Will work, not preferred

const VaadinGrid = reactifyWc("vaadin-grid");
const VaadinGridColumn = reactifyWc("vaadin-grid-column");

const MyReactComponent = () => (
  <VaadinGrid items={items}>
    <VaadinGridColumn path="name.first" header="First Name" onClick={onClick} />
    <vaadin-grid-column path="name.last" header="Last Name" />
  </VaadinGrid>
);
```

## From React to Web Components and Back Again

You can mix and match your reactified web components and React components:

```jsx
const WriteNames = ({ names }) => names.map(name => <p>{name}</p>);
const ReactifiedWc = reactifyWc("web-comp");

const names = ["Bryce", "Brion", "Pia", "Fabian"];

const MyComponent = () => (
  <ReactifiedWc>
    <WriteNames names={names} />
  </ReactifiedWc>
);
```

# Contribute

Contribute to the project in our git repo by opening a PR with changes. We have
no official contribution guide yet.

# Roadmap

1. Add testing suite with Cypress.
2. Do some deep comparison between the changing props, attributes, and especially
   event handlers so that we aren't setting and removing them on every `componentDidUpdate`.

# Credits

This software was created in-house at
Mercedes-Benz Research & Development North America, Seattle HUB. This software is provided
under the MIT license. [We're hiring](https://www.mbusa.com/en/careers)!

![Mercedes-Benz
logo](https://www.mbusa.com/etc/designs/mb-nafta/images/Mercedes_Benz__logo--desktop.png)
