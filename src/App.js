import React from 'react';
import Content from './Content';
import Controls from './Sidebar';

const App = () => (
  // use Effect
  // on load, reach out to airtable
  // get style pairings and tags

  <div
    style={{
      display: 'flex'
    }}
  >
    <Content
      title="The recorded voice scratched in the speaker."
      body="Almost before we knew it, we had left the ground. A shining crescent far beneath the flying vessel. It was going to be a lonely trip back."
      primary="#000"
      secondary="#5a5a5a"
      tertiary="#d7e7ef"
    />
    <Controls />
  </div>
);

export default App;
