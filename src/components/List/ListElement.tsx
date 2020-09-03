import React from "react";
import IEmail from "../../interfaces/IEmail";
import style from "./styles";
import moment from "moment";
import ITag from "../../interfaces/ITag";
import { StyledLabel } from "../assets/Label";
import { Checkbox, Icon } from "semantic-ui-react";

interface Props {
  email: IEmail;
  setSelectedEmail: (number) => void;
  selectedEmail: number;
  expandEmail: (number) => void;
  checkEmail: (number, boolean) => void;
  index: number;
  tags: ITag[];
  mobile: boolean;
}
const { ListElementContainer } = style;

const setArrowIcon = (mobile, expanded, index, selectedEmail) => {
  switch (true) {
    case mobile && expanded:
      return "arrow up";
    case mobile && !expanded:
      return "arrow down";
    case !mobile && selectedEmail === index:
      return "eye";
    case !mobile && selectedEmail !== index:
      return "arrow right";
    default:
      break;
  }
};

const ListElement: React.FC<Props> = ({
  setSelectedEmail,
  selectedEmail,
  email,
  index,
  tags,
  mobile,
  expandEmail,
  checkEmail,
}) => {
  return (
    <ListElementContainer selected={selectedEmail === index} key={email.id}>
      <div>
        <h3>{email.subject}</h3>
      </div>
      <div>{email.sender}</div>
      <div>{moment(email.date).format("LL")}</div>
      <div>
        {email.tags.map((tag, index) => (
          <StyledLabel color={tags.find((t) => t.key === tag).color} selected>
            {tag}
          </StyledLabel>
        ))}
      </div>
      <div>
        <Checkbox
          checked={email.checked}
          onChange={(e, data) => checkEmail(index, data.checked)}
        />
      </div>
      <div>
        <Icon
          name={setArrowIcon(mobile, email.expanded, index, selectedEmail)}
          size="big"
          onClick={() => {
            expandEmail(index);
            setSelectedEmail(index);
          }}
        />
      </div>
    </ListElementContainer>
  );
};
export default ListElement;
