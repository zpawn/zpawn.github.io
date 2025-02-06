import { get } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { getOrganizationsService } from "../../services/trello";
import { QueryKey } from "../../query";
import type { Organization } from "../../services/trello/types";

type UseHomeDeps = () => {
    isLoading: boolean,
    organizations: Organization[],
};

const useHomeDeps: UseHomeDeps = () => {
    const organizations = useQuery({
        queryKey: [QueryKey.ORGANIZATIONS],
        queryFn: getOrganizationsService,
    });

    return {
        isLoading: [organizations].some(({ isLoading }) => isLoading),
        organizations: get(organizations, ["data"], []) || [],
    };
};

export { useHomeDeps };
