import React from "react";
import style from "./styles";
import ITag from "../../interfaces/ITag";
import Label from "../assets/Label";
import { randomColor } from "../../utils/randomColor";

interface Props {
  tags: ITag[];
  selected: string[];
  setSelected: (string) => void;
}
const { TagsContainer } = style;

const SideBar: React.FC<Props> = ({ setSelected, tags, selected }) => {
  return (
    <TagsContainer>
      {tags?.map((tag: ITag, index) => (
        <>
          <Label
            color={tag.color}
            key={index}
            onClick={() => setSelected(tag.key)}
            selected={selected.includes(tag.key)}
            text={tag.key}
          />
        </>
      ))}
    </TagsContainer>
  );
};
export default SideBar;
