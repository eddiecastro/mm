import ITag from "./ITag";

export default interface IEmail {
  id: string;
  subject: string;
  sender: string;
  body: string;
  tags: string[];
  date: string;
  checked?: boolean;
  expanded?: boolean;
  hidden?: boolean;
}
