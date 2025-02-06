import { API_KEY, BASE_URL } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";
import { CardType, ChecklistItem, ChecklistItemState } from "./types";

const updateChecklistItemService = (
  cardId: CardType["id"],
  checklistItemId: ChecklistItem["id"],
  queryParams: { state: ChecklistItemState },
) => {
  return baseRequest<ChecklistItem>({
    url: `${BASE_URL}/cards/${cardId}/checkItem/${checklistItemId}`,
    method: "PUT",
    queryParams: {
      ...queryParams,
      key: API_KEY,
      token: `${getTokenService()}`,
    },
  });
};

export { updateChecklistItemService };
