import styled from "styled-components";

export default {
  ListElementContainer: styled.div<{ selected: boolean }>`
    gap: 5px;
    padding: 23px 0;
    background: lightgray;
    border-bottom: 1px solid gray;
    border-radius: 5px;
    margin: 6px 0;
    border: 1px solid ${(props) => (props.selected ? "#4285F4" : "none")};
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-template-areas:
      "subject subject"
      "sender date"
      "tags tags"
      "check button";
    > div {
      padding: 0 10px;
    }
    > div:nth-child(1) {
      grid-area: subject;
    }
    > div:nth-child(2) {
      grid-area: sender;
    }
    > div:nth-child(3) {
      grid-area: date;
      text-align: end;
    }
    > div:nth-child(4) {
      grid-area: tags;
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      justify-content: flex-start;
    }
    > div:nth-child(5) {
      grid-area: check;
    }
    > div:nth-child(6) {
      grid-area: button;
      justify-self: end;
    }
    :hover {
      box-shadow: 1px 1px 5px;
    }
  `,
};
