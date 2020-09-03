import React from "react";
import IEmail from "../../interfaces/IEmail";
import parse from "html-react-parser";

interface Props {
  email: IEmail;
}

const Email: React.FC<Props> = ({ email }) => {
  return (
    <div>
      <hr />
      <h2>{email.subject}</h2>
      <hr />
      <h5>{email.sender}</h5>
      {parse(email.body)}
    </div>
  );
};
export default Email;
