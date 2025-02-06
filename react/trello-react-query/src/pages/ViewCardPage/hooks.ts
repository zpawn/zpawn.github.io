import { useCallback } from "react";
import { get } from "lodash";
import { useQuery } from "@tanstack/react-query";
import {
    getCardService,
    getCardCommentsService,
    getOrganizationsService,
    updateChecklistItemService,
} from "../../services/trello";
import { useAsyncError } from "../../hooks";
import { QueryKey, queryClient } from "../../query";
import type { Maybe } from "../../types";
import type {
    Comment,
    CardType,
    Organization,
    ChecklistItem,
} from "../../services/trello/types";

type UseCard = (cardId?: CardType["id"]) => {
    card: Maybe<CardType>,
    comments: Maybe<Comment[]>,
    loading: boolean,
    organizations: Organization[],
    onChangeChecklistItem: (
        itemId: ChecklistItem["id"],
        state: ChecklistItem["state"],
    ) => void,
};

const useCard: UseCard = (cardId) => {
    const { asyncErrorHandler } = useAsyncError();

    const card = useQuery({
        queryKey: [QueryKey.CARD, cardId as CardType["id"]],
        queryFn: () => getCardService(cardId as CardType["id"]),
        enabled: Boolean(cardId),
    });

    const comments = useQuery({
        queryKey: [QueryKey.CARD, cardId as CardType["id"], QueryKey.COMMENTS],
        queryFn: () => getCardCommentsService(cardId as CardType["id"]),
        enabled: Boolean(cardId),
    });

    const organizations = useQuery({
        queryKey: [QueryKey.ORGANIZATIONS],
        queryFn: getOrganizationsService,
    });

    const onChangeChecklistItem = useCallback((itemId: ChecklistItem["id"], state: ChecklistItem["state"]) => {
        if (!cardId) {
            return;
        }

        updateChecklistItemService(cardId, itemId, { state })
            .then(() => queryClient.invalidateQueries())
            .catch(asyncErrorHandler);
    }, [cardId, asyncErrorHandler]);

    return {
        loading: [card, comments, organizations].some(({ isLoading }) => isLoading),
        card: get(card, ["data"]),
        comments: get(comments, ["data"]),
        organizations: get(organizations, ["data"], []) || [],
        onChangeChecklistItem,
    };
};

export { useCard };
