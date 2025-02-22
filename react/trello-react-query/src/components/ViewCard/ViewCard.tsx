import { useMemo } from "react";
import get from "lodash/get";
import size from "lodash/size";
import { NoFound, Divider } from "../common";
import { Info } from "./Info";
import { CheckLists } from "./CheckLists";
import { Comments } from "./Comments";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { CardType, ChecklistItem, Comment, Organization } from "../../services/trello/types";

type Props = {
  card: Maybe<CardType>;
  comments: Maybe<Comment[]>;
  organizations: Organization[];
  onNavigateToAddNewComment: () => void;
  onChangeChecklistItem: (
    itemId: ChecklistItem["id"],
    state: ChecklistItem["state"],
  ) => Promise<void>;
};

const ViewCard: FC<Props> = ({
  card,
  comments,
  organizations,
  onNavigateToAddNewComment,
  onChangeChecklistItem,
}) => {
  const checklists = get(card, ["checklists"]);
  const isChecklists = useMemo(() => {
    return Array.isArray(checklists) && Boolean(size(checklists));
  }, [checklists]);

  if (!card) {
    return (<NoFound />);
  }

  return (
    <>
      <Info card={card} organizations={organizations} />
      {isChecklists && (<Divider style={{ marginBottom: 10 }} />)}
      <CheckLists checklists={checklists} onChangeChecklistItem={onChangeChecklistItem} />
      <Divider style={{ marginBottom: 10 }} />
      <Comments comments={comments} onClickTitleAction={onNavigateToAddNewComment} />
    </>
  );
};

export { ViewCard };
