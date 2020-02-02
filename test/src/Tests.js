import React from "react";
import "./Tests.css";
import { Button, Grid, GridColumn, GridSelectionColumn } from "./components";
import { people } from "./constants";
import TestDialog from "./TestDialog";

const Tests = () => {
  return (
    <div className="wrapper">
      <div className="row">
        <div className="component">
          <p>onClick</p>
          <Button onClick={() => alert("HEY THERE")}>Click me!</Button>
        </div>

        <div className="component">
          <p>on-click</p>
          <Button on-click={() => alert("HEY THERE")}>Click me!</Button>
        </div>

        <div className="component">
          <p>onClick</p>
          <Button onClick={() => alert("HEY THERE")}>Click me!</Button>
        </div>
      </div>

      <div className="component">
        <p>onClick</p>
        <Grid items={people}>
          <GridSelectionColumn />
          <GridColumn path="name.first" header="First" />
          <GridColumn path="name.last" header="Last" />
          <GridColumn path="food" header="Favorite Food" />
        </Grid>
      </div>

      <div className="component">
        <TestDialog />
      </div>
    </div>
  );
};

export default Tests;
