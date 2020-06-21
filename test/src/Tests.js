import React, { PureComponent } from "react";
import reactify from "reactify-wc";

import "./Tests.css";
import { Button, Grid, GridColumn, GridSelectionColumn } from "./components";
import { people } from "./constants";

import "./webComponents/StringTest";
import "./webComponents/BooleanTest";
import "./webComponents/NumberTest";
import "./webComponents/PropertyTest";
import "./webComponents/ChildrenTest";
import "./webComponents/EventTest";
import "./webComponents/StyleTest";
import "./webComponents/RefTest";

const StringTest = reactify("string-test");
const BooleanTest = reactify("boolean-test");
const BooleanTestForceProp = reactify("boolean-test", {
  forceProperty: ["boolean"],
});
const NumberTest = reactify("number-test");
const PropertyTest = reactify("property-test");
const ChildrenTest = reactify("children-test");
const EventTest = reactify("event-test");
const EventTestForceEvent = reactify("event-test", {
  forceEvent: ["thing"],
});
const StyleTest = reactify("style-test");
const RefTest = reactify("ref-test");

class Tests extends PureComponent {
  constructor() {
    super();
    this.ref = React.createRef(null);
    this.state = {
      ref: null,
      string: "Bryce",
      boolean: true,
      number: 123,
      property: people[0],
      showChild: true,
    };
  }

  render() {
    return (
      <div className="wrapper">
        <div className="state">
          <h1>React State:</h1>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
        <div className="components">
          <div className="row">
            <div className="component">
              <h3>String Test</h3>
              <StringTest string={this.state.string} />
              <Button
                onClick={() => {
                  this.setState({
                    string:
                      people[Math.floor(Math.random() * people.length)].name
                        .first,
                  });
                }}
              >
                Randomize!
              </Button>
            </div>
            <div className="component">
              <h3>Number Test</h3>
              <NumberTest number={this.state.number}></NumberTest>
              <Button
                onClick={() => {
                  this.setState({ number: Math.floor(Math.random() * 1000) });
                }}
              >
                Randomize!
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="component">
              <h3>Boolean Test</h3>
              <i>(Attribute)</i>
              <BooleanTest boolean={this.state.boolean} />
              <Button
                onClick={() => {
                  this.setState(({ boolean }) => ({
                    boolean: !boolean,
                  }));
                }}
              >
                Flip!
              </Button>
            </div>
            <div className="component">
              <h3>Boolean Test</h3>
              <i>(Forced Prop)</i>
              <BooleanTestForceProp boolean={this.state.boolean} />
              <Button
                onClick={() => {
                  this.setState(({ boolean }) => ({
                    boolean: !boolean,
                  }));
                }}
              >
                Flip!
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="component">
              <h3>Property Test</h3>
              <PropertyTest property={this.state.property} />
              <Button
                onClick={() => {
                  this.setState({
                    property: people[Math.floor(Math.random() * people.length)],
                  });
                }}
              >
                Randomize!
              </Button>
            </div>
            <div className="component">
              <h3>Children Test</h3>
              <ChildrenTest>
                {this.state.showChild && <p>A child!</p>}
              </ChildrenTest>
              <Button
                onClick={() => {
                  this.setState(({ showChild }) => ({ showChild: !showChild }));
                }}
              >
                Toggle Child!
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="component">
              <h3>Style Test</h3>
              <StyleTest style={{ color: "red" }}>Text has red color</StyleTest>
            </div>
            <div className="component">
              <h3>Ref Test</h3>
              <RefTest ref={this.ref}></RefTest>
              <p>Check that ref.current.tagName is REF-TEST</p>
              <Button
                onClick={() => {
                  this.setState({
                    ref: this.ref.current.tagName,
                  });
                }}
              >
                Check ref!
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="component">
              <h3>Event Test</h3>
              <i>
                with <code>onThing</code>
              </i>
              <EventTest onThing={({ detail }) => alert(detail)} />
            </div>
            <div className="component">
              <h3>Event Test</h3>
              <i>
                with <code>on-thing</code>
              </i>
              <EventTest on-thing={({ detail }) => alert(detail)} />
            </div>
          </div>
          <div className="row">
            <div className="component">
              <h3>Event Test</h3>
              <i>
                forced event with <code>thing</code>
              </i>
              <EventTestForceEvent thing={({ detail }) => alert(detail)} />
            </div>
          </div>
          <div className="component">
            <h3>Vaadin Grid</h3>
            <Grid items={people}>
              <GridSelectionColumn />
              <GridColumn path="name.first" header="First" />
              <GridColumn path="name.last" header="Last" />
              <GridColumn path="food" header="Favorite Food" />
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default Tests;
