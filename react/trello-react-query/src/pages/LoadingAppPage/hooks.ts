import { useEffect } from "react";
import { size } from "lodash";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { getLinkedCardsService } from "../../services/local";
import { getCurrentMemberService } from "../../services/trello";

const useCheckIsAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentMemberService()
      .then(() => getLinkedCardsService())
      .then((entityIds) => navigate(size(entityIds) ? routes.HOME : routes.LINK_CARD))
      .catch(() => navigate(routes.LOGIN))
  }, [navigate]);
};

export { useCheckIsAuth };
