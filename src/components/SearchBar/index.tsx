import React from "react";
import { Icon, Menu, Dropdown } from "semantic-ui-react";
import ITag from "../../interfaces/ITag";

interface Props {
  addTagToCheckedMails: (string) => void;
  mobile: boolean;
  onClick: () => void;
  tags: ITag[];
}

const SearchBar: React.FC<Props> = ({
  tags,
  mobile,
  onClick,
  addTagToCheckedMails,
}) => {
  return (
    <div>
      {mobile ? <Icon onClick={onClick} name="bars" size="big" /> : <div></div>}
      <Menu compact>
        <Dropdown
          text="Add Tag"
          options={tags}
          simple
          item
          onChange={(_, data) => addTagToCheckedMails(data.value)}
        />
      </Menu>
    </div>
  );
};
export default SearchBar;
