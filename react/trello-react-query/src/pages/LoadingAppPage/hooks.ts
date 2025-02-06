import { useEffect } from "react";
import { size } from "lodash";
import { useNavigate } from "react-router-dom";
import { getLinkedCardsService } from "../../services/local";
import { getCurrentMemberService } from "../../services/trello";

const useCheckIsAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentMemberService()
      .then(() => getLinkedCardsService())
      .then((entityIds) => navigate(size(entityIds) ? "/home" : "/link_card"))
      .catch(() => navigate("/log_in"))
  }, [navigate]);
};

export { useCheckIsAuth };
