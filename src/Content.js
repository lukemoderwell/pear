import React from 'react';

const Content = ({ titleFont, bodyFont, primary, secondary, tertiary }) => (
  <div
    style={{
      display: 'inline-block',
      height: '100vh',
      padding: '10% 20%',
      backgroundColor: primary
    }}
  >
    <h1
      style={{
        color: secondary,
        fontFamily: titleFont,
        fontSize: '3rem'
      }}
    >
      The recorded voice scratched in the speaker.
    </h1>
    <p
      style={{
        color: tertiary || 'rgba(0,0,0,.75)',
        fontFamily: bodyFont,
        fontSize: '1rem',
        lineHeight: '1.5'
      }}
    >
      Almost before we knew it, we had left the ground. A shining crescent far
      beneath the flying vessel. It was going to be a lonely trip back. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.
    </p>
    <p
      style={{
        color: tertiary || 'rgba(0,0,0,.75)',
        fontFamily: bodyFont,
        fontSize: '1rem',
        lineHeight: '1.5'
      }}
    >
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
);

export default Content;
