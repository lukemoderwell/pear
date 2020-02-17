import React, { Fragment } from 'react';
import styled from 'styled-components';
const Wrapper = styled.section`
  display: inline-block;
  height: 100vh;
  padding: 10% 20%;
  background-color: ${props => props.bgColor};
  overflow-y: auto;
`;

const Button = styled.button`
  padding: 10px 12px;
  color: ${props => props.textColor};
  background-color: ${props => props.bgColor};
  font-family: ${props => props.font};
  font-size: 1rem;
  outline: 0;
  border: 0;
  &:hover {
    cursor: pointer;
    background-color: ${props => props.bgColor};
  }
`;

const Title = styled.h1`
  color: ${props => props.textColor};
  font-family: ${props => props.font};
  font-size: 3.052em;
  line-height: 1.25;
`;

const Paragraph = styled.p`
  color: ${props => props.textColor};
  font-family: ${props => props.font};
  font-size: ${props => (props.size ? props.size : '1em')};
  line-height: 1.5;
`;

const Label = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  background-color: white;
  padding: 8px 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Content = ({
  name,
  titleFont,
  bodyFont,
  primary,
  secondary,
  tertiary
}) => {
  return (
    <Wrapper bgColor={primary} font={bodyFont}>
      <Label>Theme: {name}</Label>
      <Title textColor={secondary} font={titleFont}>
        The recorded voice scratched in the speaker.
      </Title>
      <Paragraph
        textColor={tertiary || 'rgba(0,0,0,.75)'}
        font={bodyFont}
        size="1.25em"
      >
        Almost before we knew it, we had left the ground. A shining crescent far
        beneath the flying vessel. It was going to be a lonely trip back. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </Paragraph>
      <Paragraph textColor={tertiary || 'rgba(0,0,0,.75)'} font={bodyFont}>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Paragraph>
      <Paragraph textColor={tertiary || 'rgba(0,0,0,.75)'} font={bodyFont}>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Paragraph>
      <Button
        textColor={tertiary || 'rgba(255,255,255,.65)'}
        bgColor={secondary}
        font={bodyFont}
      >
        Click Me
      </Button>
    </Wrapper>
  );
};

export default Content;
