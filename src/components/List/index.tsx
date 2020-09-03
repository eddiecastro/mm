import React from "react";
import IEmail from "../../interfaces/IEmail";
import ListElement from "./ListElement";
import ITag from "../../interfaces/ITag";
import Loading from "./Loading";
import Email from "../Email";
import style from "./styles";
const { ListElementContainer } = style;

interface Props {
  emails?: IEmail[];
  length?: number;
  selectedEmail: number;
  setSelectedEmail: (number) => void;
  checkEmail: (number, boolean) => void;
  tags: ITag[];
  loading: boolean;
  mobile: boolean;
  expandEmail: (number) => void;
}

const List: React.FC<Props> = ({
  setSelectedEmail,
  selectedEmail,
  tags,
  emails,
  length,
  loading,
  expandEmail,
  mobile,
  checkEmail,
}) => {
  const noDisplay = emails.every((email) => email.hidden);

  return (
    <div>
      {!loading ? (
        noDisplay ? (
          <ListElementContainer>
            <h4>No Data</h4>
          </ListElementContainer>
        ) : (
          emails.map((email, index) => (
            <>
              {email.hidden ? null : (
                <ListElement
                  checkEmail={checkEmail}
                  index={index}
                  selectedEmail={selectedEmail}
                  setSelectedEmail={setSelectedEmail}
                  key={`ListElement${index}`}
                  email={email}
                  tags={tags}
                  mobile={mobile}
                  expandEmail={expandEmail}
                />
              )}
              {email.expanded && mobile ? <Email email={email} /> : <div></div>}
            </>
          ))
        )
      ) : (
        [...Array(length)].map((e, i) => (
          <div>
            <Loading key={`Loading${i}`} />
          </div>
        ))
      )}
    </div>
  );
};
export default List;
