import { useState, useCallback } from "react";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";
import { deleteLinkedCardService } from "../services/local";
import { useAsyncError } from "./useAsyncError";
import type { CardType } from "../services/trello/types";

type UseUnlinkCard = () => {
    isLoading: boolean,
    unlink: (card: CardType) => void,
};

const useUnlinkCard: UseUnlinkCard = () => {
    const navigate = useNavigate();
    const { asyncErrorHandler } = useAsyncError();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const unlink = useCallback((card?: CardType) => {
        if (isEmpty(card)) {
            return;
        }

        setIsLoading(true);

        return Promise.all([
          deleteLinkedCardService(card.id),
        ])
            .catch(asyncErrorHandler)
            .finally(() => {
                setIsLoading(false);
                navigate(routes.HOME);
            });
    }, [navigate, asyncErrorHandler]);

    return { isLoading, unlink };
};

export { useUnlinkCard };
