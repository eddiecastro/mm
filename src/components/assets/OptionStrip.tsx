import React from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > i {
    padding-left: 10px;
    color: grey;
    :hover {
      color: black;
    }
  }
`;

interface Props {
  next: (number) => void;
  prev: (number) => void;
}

const OptionStrip: React.FC<Props> = ({ next, prev }) => {
  return (
    <Container>
      <Icon size="big" onClick={prev} name="arrow up" />
      <Icon size="big" onClick={next} name="arrow down" />
      <Icon size="big" name="reply" />
      <Icon size="big" name="reply all" />
      <Icon size="big" name="forward" />
    </Container>
  );
};
export default OptionStrip;
