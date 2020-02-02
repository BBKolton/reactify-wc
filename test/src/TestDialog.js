import React, { useState } from "react";
import { Button, Dialog } from "./components";

export const TestDialog = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Dialog</Button>
      <Dialog
        opened={opened}
        on-opened-changed={({ detail: value }) =>
          value !== opened ? setOpened(value) : ""
        }
        // renderer={root => (
        //   <div>
        //     <p>Hi! I'm a dialog!</p>
        //     <Button onClick={() => setOpened(false)}>Close</Button>
        //   </div>
        // )}
      >
        <template>
          <p>Whyyy</p>
        </template>
      </Dialog>
    </>
  );
};

export default TestDialog;
