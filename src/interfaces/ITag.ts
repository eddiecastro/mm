import { runInThisContext } from "vm";

export default interface ITag {
  key: string;
  value: string;
  text: string;
  color: string;
}
