import React from "react";
import styled from "styled-components";

export const StyledLabel = styled.div<{ selected: boolean; color: string }>`
  padding: 5px 20px;
  background: ${(props) => (props.selected ? props.color : "white")};
  border-radius: 20px;
  cursor: pointer;
  width: min-content;
  padding: 5px 25px;
  :hover {
    background: ${(props) => props.color};
    opacity: ${(props) => ".5"};
  }
`;

interface Props {
  color: string;
  onClick: (a: string | number) => void;
  selected: boolean;
  text: string;
}

const Label: React.FC<Props> = ({ text, selected, onClick, color }) => {
  return (
    <StyledLabel selected={selected} onClick={onClick}Î color={color}>
      {text}
    </StyledLabel>
  );
};
export default Label;
