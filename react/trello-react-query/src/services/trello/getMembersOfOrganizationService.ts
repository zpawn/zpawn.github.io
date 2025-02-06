import { API_KEY, BASE_URL } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";
import { Board, Member } from "./types";

const getMembersOfOrganizationService = (organizationId: Board["id"]) => {
    return baseRequest<Member[]>({
        url: `${BASE_URL}/organizations/${organizationId}/members`,
        queryParams: {
          key: API_KEY,
          token: `${getTokenService()}`,
        },
    });
};

export { getMembersOfOrganizationService };
