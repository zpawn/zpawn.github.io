import { useParams, useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { EditCard } from "../../components";
import type { FC } from "react";

const EditCardPage: FC = () => {
  const navigate = useNavigate();
  const { cardId } = useParams();

  const onSubmit = () => Promise.resolve();

  const onCancel = () => navigate(`${routes.CARD}/${cardId}`);

    return (
      <EditCard
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    );
};

export { EditCardPage };
