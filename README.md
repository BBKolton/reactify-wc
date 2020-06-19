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

> Booleans are special! HTML specification states that if an attribute is
> `false`, it should simply not appear. If you need a boolean to appear as a
> property, check the [Forcing Types](#Forcing-Types) section.

## Functions / Events

Any `function` that has a property name that starts with `on[A-Z]` or `on-[a-z]`
is stripped of its prefix and added as an event listener. Examples:

- `onMyEvent` -> `addEventListener("myEvent")`
- `on-my-event` -> `addEventListener("my-event")`

Note that in the case of `on[A-Z]`, the first letter is `toLowerCase`ed

```jsx
const Example = () => (
  <VaadinButton onClick={handleClick}>Click</VaadinButton>
  // calls addEventListener('click', handleClick)
  // The 'on' prefix is truncated, and the next char lowercased

  <VaadinButton on-my-event={handleMyEvent}>Click</VaadinButton>
  // calls addEventListener('my-event', handleMyEvent)
  // The 'on-' prefix is truncated

  <VaadinButton functionalProp={functionalProp}>Click</VaadinButton>
  // adds a prop 'functionalProp' -> functionalProp
)

```

Events passed into the event handlers are browser events, not React
SyntheticEvents.

## From React to Web Components and Back Again

You can mix and match your reactified web components and React components:

```jsx
const WriteNames = ({ names }) => names.map((name) => <p>{name}</p>);
const ReactifiedWc = reactifyWc("web-comp");

const names = ["Bryce", "Brion", "Pia", "Fabian", "Larry"];

const MyComponent = () => (
  <ReactifiedWc>
    <WriteNames names={names} />
  </ReactifiedWc>
);
```

## Forcing Types

You can force any named property to be an event listener, property, attribute, or any
combination of the three. This behavior is most useful for custom boolean
behavior. For most cases, you will not need to force a type.

```jsx
import React from "react";
import reactifyWc from "reactify-wc";

// Import your web component. This one defines a tag called 'my-element'
import "@vaadin/vaadin-button";

const VaadinButton = reactifyWc("my-element", {
  forceProperty: ["setMeAsAProp"],
  forceAttribute: ["setMeAsAnAttribute"],
  forceEvent: ["setMeAsAnEventListener"],
});

export const MyReactComponent = () => (
  <VaadinButton
    setMeAsAProp="value"
    setMeAsAnAttribute={[]}
    setMeAsAnEventListener={() => {}}
  >
    Click me!
  </VaadinButton>
);
```

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
  </VaadinGrid>
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

# Testing and Examples

There is now a small test page filled with example web components and basic
tests, available in the test folder. View the tests cloning the repo and
running:

```bash
cd test;
npm install;
npm start;
```

# Contribute

Contribute to the project in our git repo by opening a PR with changes. We have
no official contribution guide yet.

# Roadmap

1. Add Cypress to testing suite.
2. Do some deep comparison between the changing props, attributes, and especially
   event handlers so that we aren't setting and removing them on every
   `componentDidUpdate`.
3. Add CI/CD pipeline to GitHub.

# Credits

This software was created in-house at
Mercedes-Benz Research & Development North America, Seattle HUB. This software is provided
under the MIT license. [We're hiring](https://www.mbusa.com/en/careers)!

![Mercedes-Benz
logo](https://www.mbusa.com/etc/designs/mb-nafta/images/Mercedes_Benz__logo--desktop.png)
