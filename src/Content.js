import React from 'react';

const Content = ({ title, body, primary, secondary, tertiary }) => (
  <div
    style={{
      display: 'inline-block',
      width: '70%',
      height: '100vh',
      padding: '40px',
      backgroundColor: tertiary
    }}
  >
    <h1 style={{ color: primary }}>{title}</h1>
    <p style={{ color: secondary }}>{body}</p>
  </div>
);

export default Content;
