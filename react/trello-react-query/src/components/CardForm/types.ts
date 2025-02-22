import type {
  List,
  Label,
  Board,
  Member,
  CardType,
  Organization,
} from "../../services/trello/types";

export type FormProps = {
  onSubmit: (values: object) => Promise<void>;
  onCancel?: () => void;
  isEditMode?: boolean;
  error?: string | string[];
  card?: CardType;
};

export type Values = {
  title: CardType["name"];
  workspace: Organization["id"];
  board: Board["id"];
  list: List["id"];
  description: CardType["desc"];
  labels: Array<Label["id"]>;
  dueDate: Date;
  members: Array<Member["id"]>;
};
