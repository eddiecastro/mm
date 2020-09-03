import React, { useState, useReducer, useEffect } from "react";

import { style } from "./App.styles";
import List from "./components/List";
import SearchBar from "./components/SearchBar";
import SideBar from "./components/SideBar";
import { fakeEmails } from "./data/email";
import { randomColor } from "./utils/randomColor"; // import the script
import IEmail from "./interfaces/IEmail";
import Email from "./components/Email";
import ITag from "./interfaces/ITag";
import OptionStrip from "./components/assets/OptionStrip";

const { Container, Logo } = style;

const initialState = { emails: [], selectedTags: [], selectedEmailID: -1 };

interface IActions {
  type:
    | "setEmails"
    | "setLoading"
    | "setTags"
    | "setSelectedTags"
    | "setSelectedEmail";
  payload: boolean | IEmail[] | number | string[] | ITag[];
}

function reducer(state, action: IActions) {
  switch (action.type) {
    case "setEmails":
      return { ...state, emails: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setTags":
      return { ...state, tags: action.payload };
    case "setSelectedTags":
      return { ...state, selectedTags: action.payload };
    case "setSelectedEmail":
      return { ...state, selectedEmailID: action.payload };
    default:
      throw new Error();
  }
}

function App() {
  const [search, setSearch] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const mobile = useWindowSize();
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    dispatch({ type: "setLoading", payload: true });
    const rand = Math.random() * 3000;
    setTimeout(() => {
      dispatch({ type: "setLoading", payload: false });
      dispatch({ type: "setEmails", payload: fakeEmails });
    }, rand);
    const _tags = [];
    fakeEmails.forEach((email) => {
      email.tags.forEach((tag) => {
        if (!_tags.includes(tag)) {
          _tags.push(tag);
        }
      });
    });
    const tags = _tags.map((tag) => {
      return { key: tag, color: randomColor(), text: tag, value: tag };
    });
    dispatch({
      type: "setTags",
      payload: tags,
    });
  }, []);

  useEffect(() => {
    const emails = [...state.emails];
    const selectedTags = [...state.selectedTags];
    if (selectedTags.length === 0) {
      emails.forEach((email: IEmail) => {
        email.hidden = false;
      });
    } else {
      emails.forEach((email: IEmail) => {
        for (let i = 0; i < email.tags.length; i++) {
          if (hasAllTags(selectedTags, email.tags)) {
            email.hidden = false;
          } else {
            email.hidden = true;
          }
        }
      });
    }
    dispatch({
      type: "setEmails",
      payload: emails,
    });
  }, [state.selectedTags]);

  function hasAllTags(needed: Array<any>, included: Array<any>) {
    for (let i = 0; i < needed.length; i++) {
      if (!included.includes(needed[i])) return false;
    }
    return true;
  }

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setMobile(window.innerWidth < 620);
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return mobile;
  }

  const setSelectedTag = (tag: string) => {
    const index = state.selectedTags.indexOf(tag);
    if (index !== -1) {
      dispatch({
        type: "setSelectedTags",
        payload: [
          ...state.selectedTags.slice(0, index),
          ...state.selectedTags.slice(index + 1, state.selectedTags.length),
        ],
      });
    } else {
      dispatch({
        type: "setSelectedTags",
        payload: [...state.selectedTags, tag],
      });
    }
  };

  const selectEmail = (id: number) => {
    dispatch({
      type: "setSelectedEmail",
      payload: id,
    });
  };

  const prevEmail = () => {
    if (state.selectedEmailID !== 0) {
      dispatch({
        type: "setSelectedEmail",
        payload: state.selectedEmailID - 1,
      });
    }
  };

  const nextEmail = () => {
    if (state.selectedEmailID < state.emails.length - 1) {
      dispatch({
        type: "setSelectedEmail",
        payload: state.selectedEmailID + 1,
      });
    }
  };

  const expandEmail = (id: number) => {
    const _emails: IEmail[] = state.emails;
    _emails[id].expanded = !_emails[id].expanded;
    dispatch({
      type: "setEmails",
      payload: _emails,
    });
  };

  const checkEmail = (index: number, value: boolean) => {
    const _emails: IEmail[] = state.emails;
    _emails[index].checked = !_emails[index].checked;
    dispatch({
      type: "setEmails",
      payload: _emails,
    });
  };

  const addTagToCheckedMails = (tag: string) => {
    const _emails: IEmail[] = state.emails;
    _emails.forEach((email) => {
      if (email.checked && !email.tags.includes(tag)) {
        email.tags.push(tag);
      }
    });
    dispatch({
      type: "setEmails",
      payload: _emails,
    });
  };

  return (
    <Container mobile={mobile} openMenu={openMenu}>
      <SearchBar
        tags={state.tags}
        onClick={() => setOpenMenu(!openMenu)}
        mobile={mobile}
        addTagToCheckedMails={addTagToCheckedMails}
      />
      <SideBar
        setSelected={setSelectedTag}
        selected={state.selectedTags}
        tags={state.tags}
      />
      <List
        checkEmail={checkEmail}
        mobile={mobile}
        expandEmail={expandEmail}
        tags={state.tags}
        selectedEmail={state.selectedEmailID}
        setSelectedEmail={selectEmail}
        emails={state.emails}
        length={10}
        loading={state.loading}
      />
      {state.selectedEmailID !== -1 && !mobile ? (
        <>
          <Logo background={randomColor()} />
          <div>
            <OptionStrip next={nextEmail} prev={prevEmail} />
            <Email email={state.emails[state.selectedEmailID]} />
          </div>
        </>
      ) : (
        <div></div>
      )}
    </Container>
  );
}

export default App;
