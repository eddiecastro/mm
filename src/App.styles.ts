import styled from "styled-components";

export const style = {
  Container: styled.div<{ mobile: boolean; openMenu: boolean }>`
    min-height: 100vh;
    display: grid;
    grid-template-columns: 10% auto auto;
    grid-template-rows: min-content 94vh;
    grid-template-areas:
      "search search Logo"
      "side list Email";
    gap: 5px;
    > div:nth-child(1) {
      grid-area: search;
      display: flex;
      align-items: end;
      justify-content: space-between;
      padding: 5px 10px;
      > i {
        padding-top: 7px;
        padding-right: 20px;
      }
    }
    > div:nth-child(2) {
      grid-area: side;
      background: white;
      z-index: 100000;
      max-width: 170px;
      width: 100%;
      height: 100%;
      padding-top: 17px;
      top: 38px;
      display: flex;
      align-items: center;
      position: ${(props) =>
        props.openMenu && props.mobile ? "absolute" : "inherit"};
      > div {
        display: ${(props) =>
          !props.openMenu && props.mobile ? "none" : "block"};
      }
    }
    > div:nth-child(3) {
      grid-area: list;
      overflow-y: auto;
    }
    > div:nth-child(4) {
      grid-area: Logo;
    }
    > div:nth-child(5) {
      overflow-y: auto;
      grid-area: Email;
    }
  `,
  Logo: styled.div<{ background: string }>`
    color: white;
    background: ${(props) => props.background};
  `,
};
