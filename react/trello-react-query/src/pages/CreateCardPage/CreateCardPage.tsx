import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { CreateCard } from "../../components";
import type { FC } from "react";

const CreateCardPage: FC = () => {
  const navigate = useNavigate();

  const onSubmit = () => Promise.resolve();

  const onCancel = () => navigate(routes.HOME);

  return (
    <CreateCard
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export { CreateCardPage };
