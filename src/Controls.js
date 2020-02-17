import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  padding: 40px;
  border-right: 1px solid #eee;
  background-color: #fefefe;
`;

const Control = styled.label`
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 1rem;
  input {
    display: block;
    margin-top: 0.5rem;
  }
`;

const Controls = ({ params }) => {
  return (
    <Wrapper>
      {Object.keys(params).map(param => {
        return (
          <Control key={param}>
            {param}
            <input
              type="range"
              id={param}
              value={params[param]}
              min="0"
              max="100"
              onChange={event => {
                const updateEvent = new CustomEvent('paramsUpdated', {
                  bubbles: true,
                  detail: { id: param, value: Number(event.target.value) }
                });
                window.dispatchEvent(updateEvent);
              }}
            />
          </Control>
        );
      })}
    </Wrapper>
  );
};

export default Controls;
