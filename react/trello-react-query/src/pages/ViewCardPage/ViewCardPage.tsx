import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../constants";
import { useSetTitle } from "../../hooks";
import { useCard } from "./hooks";
import { ViewCard } from "../../components";
import { PageLoading } from "../../components/common";
import type { FC } from "react";

/** @todo: implement unlink */
/** @todo: implement edit */
const ViewCardPage: FC = () => {
  const navigate = useNavigate();
  const { cardId } = useParams();
  const {
    card,
    loading,
    comments,
    organizations,
    onChangeChecklistItem,
  } = useCard(cardId);

  useSetTitle("View Card");

  const onNavigateToAddNewComment = useCallback(() => {
    navigate(`${routes.CARD}/${cardId}/comment/create`);
  }, [cardId, navigate]);

  if (loading) {
    return (
      <PageLoading />
    );
  }

  return (
    <ViewCard
      card={card}
      comments={comments}
      organizations={organizations}
      onNavigateToAddNewComment={onNavigateToAddNewComment}
      onChangeChecklistItem={onChangeChecklistItem}
    />
  );
};

export { ViewCardPage };
